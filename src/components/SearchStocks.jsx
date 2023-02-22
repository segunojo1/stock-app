import React, { useContext, useEffect, useState } from 'react'
import finnhub from '../apis/finnhub'
import { useGlobalContext, WatchListContext } from '../context/watchListContext';

const SearchStocks = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const {addToStocks} = useContext(WatchListContext)

  function showSearchItems() {
    const showItem =  search ? 'block' : 'hidden';
    return (
      <ul className={`${showItem} border h-[500px] w-[300px] p-[10px] overflow-y-scroll absolute z-index-9999 bg-white`}>
        {results.map((result) => {
           return <li className='cursor-pointer' key={result.symbol} onClick={()=>{
            addToStocks(result.symbol)
            setSearch('')
           }}>{result.description}({result.symbol})</li>
        })}
        
      </ul>
    )
  }
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const res = await finnhub.get('/search', {
          params: {
            q: search
          }
        })
          setResults(res.data.result)
          console.log(results);
        
      } catch (error) {
        
      }    
    }
    if(search) {
      fetchData()
    }else{
      setResults([])
    }
  }, [search])
  return (
    <div className='w-fit mx-auto'>
      <input type="text" placeholder='search' id="search" className='p-[1rem] border mx-auto'
      onChange={(e)=> setSearch(e.target.value)} value={search}/>
      <label htmlFor="search">Search</label>
      {showSearchItems()}
    </div>
  )
}

export default SearchStocks