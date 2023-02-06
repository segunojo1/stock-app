import React, { useEffect, useState } from 'react'
import finnhub from '../apis/finnhub'

const StockList = () => {
    const [stocks, setstocks] = useState()
    const [watchedStocks, setWatchedStocks] = useState(['GOOGL', 'MSFT'])

    useEffect(() => {
        const fetchFinn = async () => {
            try {
               const res = await finnhub.get('/quote', {
                params: {
                    symbol: 'MSFT'
                }
               })
               console.log(res);
               setstocks(res.data);
            } catch (error) {
                
            }
        }
        fetchFinn()
    }, [])
  return (
    <div>
        
    </div>
  )
}

export default StockList