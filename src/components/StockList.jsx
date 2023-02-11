import React, { useContext, useEffect, useState } from 'react'
import finnhub from '../apis/finnhub'
import {IoMdArrowDropup} from 'react-icons/io'
import {IoMdArrowDropdown} from 'react-icons/io'
import { WatchListContext } from '../context/watchListContext'
import { useNavigate } from 'react-router-dom'

const StockList = () => {
    const [stocks, setstocks] = useState([])
    const {watchedStock} = useContext(WatchListContext)

    const getColor = (change) => {
         return change > 0 ? 'green' : 'red'
    }
    const getIcon = (change) => {
        return change > 0 ? <IoMdArrowDropup />  : <IoMdArrowDropdown />
    }

    const navigate = useNavigate()
    const handleStockSelect =(sym) => {
      navigate(`detail/${sym}`)
    }
    useEffect(() =>{
      let isMounted = true;

        const fetchFinn = async () => {
            try {
               const respo = await Promise.all(
                watchedStock.map((stocks) => {
                  return finnhub.get('/quote', {
                    params: {
                      symbol: stocks
                    }
                   })
                })
               )
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
                console.log(error);
            }
        }
        fetchFinn()
        return () => (isMounted = false)
        
    }, [watchedStock])
  return (
    <div className='mx-auto w-fit'>
       <table className='w-[100%]'>
        <thead className=''>
          <tr>
            <th className='h-[70px]'>Name</th>
            <th>Last</th>
            <th>Chg</th>
            <th>Chg%</th>
            <th>High</th>
            <th>Low</th>
            <th>Open</th>
            <th>Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            return <tr className='h-[50px]' onClick={()=>handleStockSelect(stock.symbol)} key={stock.symbol}>
              <td className=' w-[70px]'>{stock.symbol}</td>
              <td className=' w-[70px]'>{stock.data.c}</td>
              <td className=' w-[70px]'><p className={`text-[${getColor(stock.data.d)}] flex items-center`} >{stock.data.d}{getIcon(stock.data.d)}</p></td>
              <td className=' w-[70px]'><p className={`text-[${getColor(stock.data.d)}] flex items-center`}>{stock.data.dp}{getIcon(stock.data.d)}</p></td>
              <td className=' w-[70px]'>{stock.data.h}</td>
              <td className=' w-[70px]'>{stock.data.l}</td>
              <td className=' w-[70px]'>{stock.data.o}</td>
              <td>{stock.data.pc}</td>
            </tr>
          })}
        </tbody>
        </table> 
    </div>
  )
}

export default StockList