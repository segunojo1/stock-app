import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import finnhub from '../apis/finnhub'

const StockCompany = ({symbol}) => {
    const [compDetail, setCompDetail] = useState()
    useEffect(() => {
        let isMounted = true;
         const fetchData = async () => {
            try{
                const response = await finnhub.get('/stock/profile2', {
                params: {
                    symbol: symbol
                }})
                console.log(response.data);
                if(isMounted) {
                    setCompDetail(response.data)
                }

            }catch (err){
               console.log(err);
            }
         }
         
         fetchData()
         return () => isMounted=false
    }, [symbol])
  return (
    <div>
      {compDetail && (
    <div>
        <p>{compDetail.name}</p>
        <p>{compDetail.country}</p>
        <p>{compDetail.ticker}</p>
        <p>{compDetail.exchange}</p>
        <p>{compDetail.finnhubIndustry}</p>
        <p>{compDetail.ipo}</p>
        <p>{compDetail.marketCapitalization}</p>
        <p>{compDetail.shareOutstanding}</p>
        <p>{compDetail.weburl}</p>
    </div>
      )}
    </div>
  )
}

export default StockCompany