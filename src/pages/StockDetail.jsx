import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import finnhub from '../apis/finnhub'
import Charts from '../components/Charts'
import StockCompany from '../components/StockCompany'


const formatData = (data) => {
      return data.t.map((elem, index) => {
         return {
          x: elem * 1000,
          y: Math.round(data.c[index] * 10) /10
         }
     })
}

const format2 = (data) => {
    return data.t.map((da, index) => {
      return {
        x: da * 1000,
        y: [Math.round(data.o[index] * 10) /10, Math.round(data.h[index] * 10) /10, Math.round(data.l[index] * 10) /10, Math.round(data.c[index] * 10) /10]
      }
    }) 
}

const StockDetail = () => {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState();
  const [chartData2, setChartData2] = useState();
  const [show, setShow] = useState(false)
  const [loading, setIsloading] = useState(false)
const switchh = () => {
   setShow(prev => !prev)
}
  useEffect(() => {
    setIsloading(true)
    const fetchData = async () => {
      const currentTime = Math.floor(new Date().getTime() / 1000)
      let oneDayAgo;
      if(new Date().getDay() == 6) {
        oneDayAgo = currentTime - 3600* 24 * 2
      }else if(new Date().getDay() == 0){
        oneDayAgo = currentTime - 3600 * 24 * 3
      }else{
        oneDayAgo = currentTime - 3600 * 24
      }
      const oneWeekAgo = currentTime - 3600* 24 * 7
      const oneYearAgo = currentTime - 3600* 24 * 365
      try {
        const res = await Promise.all([finnhub.get('/stock/candle', {
           params: {
             symbol,
             from: oneDayAgo,
             to: currentTime,
             resolution: 30
           }
          }),
          finnhub.get('/stock/candle', {
           params: {
             symbol,
             from: oneWeekAgo,
             to: currentTime,
             resolution: 60
           }
          }),
          finnhub.get('/stock/candle', {
           params: {
             symbol,
             from: oneYearAgo,
             to: currentTime,
             resolution: 'W'
           }
          })
        ])

        setChartData({
            day: formatData(res[0].data),
            week : formatData(res[1].data),
            year: formatData(res[2].data)
          })
          setChartData2({
            day: format2(res[0].data),
            week : format2(res[1].data),
            year: format2(res[2].data)
          })
console.log(res);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
    setIsloading(false)
  }, [symbol])
  
  console.log(chartData);
  if(loading) {
    return <div>
      <h1>Loading</h1>
    </div>
  }else{

  return <div>
        {chartData && (
          <div>
            <div>
              <div className={show ? 'hidden' : 'show'}>
            <Charts chartData={chartData} symbol={symbol} type='area'/>
            <button className='p-2 bg-[red] rounded-md ml-[17px] mt-[15px]' onClick={() => switchh()}>Switch to Another chart</button>
              </div>
           <div className={show ? 'block' : 'hidden'}>

            <Charts chartData={chartData2} symbol={symbol} type='candlestick' />
            <button className='p-2 bg-[red] rounded-md ml-[17px] mt-[15px]' onClick={() => switchh()}>Switch to Another chart</button>
           </div>
            </div>
            <div className='ml-[17px]'>
              <StockCompany symbol={symbol}/>
            </div>
          </div>
      ) }
      </div>
  }
}
export default StockDetail