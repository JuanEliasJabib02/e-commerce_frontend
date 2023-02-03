import { useEffect } from "react"
import { BrowserRouter, Route , Routes, useLocation} from "react-router-dom"
import { CheckOut, Confirmation, Home, NavBar } from "./scenes"
import ItemDetails from "./scenes/itemDetails/ItemDetails"
import CartMenu from "./scenes/global/CartMenu"

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
        < NavBar />
        < ScrollToTop />
        < Routes>
          < Route path="/" element={< Home />} /> 
          < Route path="/item/:itemId" element={< ItemDetails />} />
          < Route path="/checkout" element={< CheckOut />} /> 
          < Route path="/checkout/success" element={ < Confirmation />} /> 
        </Routes>
        < CartMenu/>
      </BrowserRouter>
    </div>
  )
}

export default App
