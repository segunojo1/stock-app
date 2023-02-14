import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import finnhub from '../apis/finnhub'
import Charts from '../components/chart'


const formatData = (data) => {
      return data.t.map((elem, index) => {
         return {
          x: elem * 1000,
          y: data.c[index]
         }
     })
}
const StockDetail = () => {
  const {symbol} = useParams()
  const [chartData, setChartData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const currentTime = Math.floor(new Date().getTime() / 1000)
      let oneDayAgo;
      if(new Date().getDay() == 6) {
        oneDayAgo = currentTime - 3600* 24 * 2
      }else if(new Date().getDay() == 0){
        oneDayAgo = currentTime - 3600* 24 * 3
      }else{
        oneDayAgo = currentTime - 3600 * 24
      }
      const oneWeekAgo = currentTime - 3600* 24 * 7
      const oneYearAgo = currentTime - 3600* 24 * 365
      console.log(new Date().getDay());
      try {
        const res = await Promise.all([finnhub.get('/stock/candle', {
           params: {
             symbol,
             to: currentTime,
             from: oneDayAgo,
             resolution: 30
           }
          }),
          finnhub.get('/stock/candle', {
           params: {
             symbol,
             to: currentTime,
             from: oneWeekAgo,
             resolution: 60
           }
          }),
          finnhub.get('/stock/candle', {
           params: {
             symbol,
             to: currentTime,
             from: oneYearAgo,
             resolution: 'W'
           }
          })
        ])
        setChartData({
            day: formatData(res[0].data),
            week : formatData(res[1].data),
            year: formatData(res[2].data)
          }
        )

        console.log(res);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])

  return (
    <div>StockDetail {symbol}
    {chartData && <Charts chartData={chartData} symbol={symbol}/>}
    </div>
  )
}
// const chartData = [{
//   day: formatData(),
//   week : formatData(),
//   year: formatData()
// }]

// const data = [
//   {x: t,
//    y: c
//   }
// ]
export default StockDetail