import { BrowserRouter, Route, Routes } from "react-router-dom"
import StockDetail from "./pages/StockDetail"
import Stocks from "./pages/Stocks"
import { WatchListProvider } from "./context/watchListContext"

function App() {
  
  return (
    <div className="App">
      <WatchListProvider>
      <BrowserRouter>
         <Routes>
          <Route path="/" element={<Stocks />}/>
          <Route path="/detail/:symbol" element={<StockDetail />}/>
         </Routes>
      </BrowserRouter>
      </WatchListProvider>
    </div>
  )
}

export default App
