import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import finnhub from '../apis/finnhub'

const StockDetail = () => {
  const {symbol} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const currentTime = Math.floor(new Date().getTime() / 1000)
      let oneDayAgo;
      if(new Date().getDay() == 6) {
        oneDayAgo = currentTime - 3600* 24 * 2
      }else if(new Date().getDay() == 0){
        oneDayAgo = currentTime - 3600* 24 * 3
      }
      console.log(new Date().getDay());
         const response = await finnhub.get('/stock/candle', {
          params: {
            symbol,
            to: currentTime,
            from: oneDayAgo,
            resolution: 30
          }
         })
         console.log(response);
    }
    fetchData()
  }, [])

  return (
    <div>StockDetail {symbol}</div>
  )
}

export default StockDetail