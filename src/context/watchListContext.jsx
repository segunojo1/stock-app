import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const WatchListContext = createContext()
export const useGlobalContext = () => {
    return useContext(WatchListContext)
}
export const WatchListProvider = ({children}) => {
    const [watchedStock, setWatchedStock] = useState(localStorage.getItem('watchlist')?.split(',') || ['GOOGL', 'MSFT', 'TSLA', 'AMZN', 'MCD'])
    useEffect(() => {
        localStorage.setItem('watchlist', watchedStock)
    }, [watchedStock])
    
    const addToStocks = (stock) => {
        if(watchedStock.indexOf(stock) === -1) {
            setWatchedStock([...watchedStock, stock])
            
        }
    }

    const deleteItem = (el) => {
        console.log('hi');
         setWatchedStock(
            watchedStock.filter((stock) => {
                return stock !== el
              })
         )
      } 

    return <WatchListContext.Provider value={{ watchedStock, addToStocks, deleteItem}}>
            {children}
        </WatchListContext.Provider>

}

