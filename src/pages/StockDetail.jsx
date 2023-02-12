import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import finnhub from '../apis/finnhub'

const StockDetail = () => {
  const {symbol} = useParams()

  useEffect(() => {
    const fetchData = async() => {
         const response = finnhub.get('/stock/candle', {
          params: {
            symbol,
            to,
            from,
            resolution
          }
         })
    }
  })

  return (
    <div>StockDetail {symbol}</div>
  )
}

export default StockDetail