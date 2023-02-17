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
    <div className='grid md:grid-cols-3'>
        <p><span className='font-bold'>Name:</span>{compDetail.name}</p>
        <p><span className='font-bold'>Country:</span>{compDetail.country}</p>
        <p><span className='font-bold'>Ticker:</span>{compDetail.ticker}</p>
        <p><span className='font-bold'>Exchange:</span>{compDetail.exchange}</p>
        <p><span className='font-bold'>Industry:</span>{compDetail.finnhubIndustry}</p>
        <p><span className='font-bold'>ipo:</span>{compDetail.ipo}</p>
        <p><span className='font-bold'>Market Capitalization:</span>{compDetail.marketCapitalization}</p>
        <p><span className='font-bold'>Shares Outstanding:</span>{compDetail.shareOutstanding}</p>
        <p><span className='font-bold'>Website:</span><a href={compDetail.weburl}>{compDetail.weburl}</a></p>
    </div>
      )}
    </div>
  )
}

export default StockCompany