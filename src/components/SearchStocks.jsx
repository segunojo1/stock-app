import React, { useEffect, useState } from 'react'
import finnhub from '../apis/finnhub'

const SearchStocks = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  function showSearchItems() {
    const showItem =  search ? 'block' : 'hidden';
    return (
      <ul className={`${showItem} border h-[500px] w-[300px] p-[10px] overflow-y-scroll absolute z-index-9999 bg-white`}>
        <li>MSFT</li>
        <li>AMZN</li>
        <li>MSFT</li>
        <li>AMZN</li>
        <li>MSFT</li>
        <li>AMZN</li>
        <li>MSFT</li>
        <li>AMZN</li>
        <li>MSFT</li>
        <li>AMZN</li>
        <li>MSFT</li>
        <li>AMZN</li>
        <li>MSFT</li>
        
      </ul>
    )
  }
  useEffect(() => {
    let isMounted = true;
    const fetchData = () => {
      try {
        const res = finnhub.get('/search', {
          q: {search}
        })
        if(isMounted) {
          setResults(res.data.result)
        }
      } catch (error) {
        
      }    
    }
    if(search) {
      fetchData()
    }else{
      setResults([])
    }
    return () => (isMounted=false)
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