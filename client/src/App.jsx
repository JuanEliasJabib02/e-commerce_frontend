import { useEffect } from "react"
import { BrowserRouter, Route , Routes, useLocation} from "react-router-dom"
import { CheckOut, Confirmation, Home } from "./scenes"
import ItemDetails from "./scenes/itemDetails/ItemDetails"

function App() {


  const ScrollToTop = () => {

    
    const { pathname } = useLocation()

    useEffect(() => {
      window.scrollTo(0,0)
    }, [pathname])
    
    return null
  }

  
  

  return (
    <div className="app">
      < BrowserRouter >
        < ScrollToTop />
        < Routes>
          < Route path="/" element={< Home />} /> 
          < Route path="/item/:itemId" element={< ItemDetails />} />
          < Route path="/checkout" element={< CheckOut />} /> 
          < Route path="/checkout/success" element={ < Confirmation />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
