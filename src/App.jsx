import { BrowserRouter, Route, Routes } from "react-router-dom"
import StockDetail from "./pages/StockDetail"
import Stocks from "./pages/Stocks"

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
          <Route path="/" element={<Stocks />}/>
          <Route path="/detail" element={<StockDetail />}/>
         </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
