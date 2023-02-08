import React, { useEffect, useState } from 'react'
import finnhub from '../apis/finnhub'

const StockList = () => {
    const [stocks, setstocks] = useState()
    const [watchedStocks, setWatchedStocks] = useState(['GOOGL', 'MSFT'])

    useEffect(() => {
      let isMounted = true;
      const responses = []
        const fetchFinn = async () => {
            try {
               
               const resp = Promise.all(
                finnhub.get('/quote', {
                  params: {
                      symbol: 'GOOGL'
                  }
                 }),
                 finnhub.get('/quote', {
                  params: {
                      symbol: 'MSFT'
                  }
                 }),
                 finnhub.get('/quote', {
                  params: {
                      symbol: 'AMZN'
                  }
                 })
               )
               if(isMounted) {
                 setstocks(res.data);
               }
            } catch (error) {
                
            }
        }
        fetchFinn()
        return () => (isMounted = false)
    }, [])
  return (
    <div>
        
    </div>
  )
}

export default StockList