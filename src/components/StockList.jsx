import React, { useEffect, useState } from 'react'
import finnhub from '../apis/finnhub'

const StockList = () => {
    const [stocks, setstocks] = useState()
    const [watchedStocks, setWatchedStocks] = useState(['GOOGL', 'MSFT', 'AMZN'])

    useEffect(() => {
      let isMounted = true;
      const responses = []
        const fetchFinn = async () => {
            try {
               const respo = await Promise.all(
                watchedStocks.map((stocks) => {
                  return finnhub.get('/quote', {
                    params: {
                      symbol: stocks
                    }
                   })
                })
               )
                console.log(respo);
               const data = respo.map((dat) => {
                return {
                  data: dat.data,
                  symbol: dat.config.params.symbol
                }
              })
              console.log(data);
               if(isMounted) {
                 setstocks(data);
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