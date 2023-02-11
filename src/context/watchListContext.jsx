import { createContext, useContext, useState } from "react";

export const WatchListContext = createContext()
export const useGlobalContext = () => {
    return useContext(WatchListContext)
}

export const WatchListProvider = ({children}) => {
    const [watchedStock, setWatchedStock] = useState(['GOOGL', 'MSFT', 'TSLA'])
    const addToStocks = (stock) => {
        if(watchedStock.indexOf(stock) === -1) {
            setWatchedStock([...watchedStock, stock])
        }
    }

    return <WatchListContext.Provider value={{ watchedStock, addToStocks}}>
            {children}
        </WatchListContext.Provider>

}

