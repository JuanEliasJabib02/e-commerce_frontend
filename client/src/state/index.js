import { configurateStore } from "@reduxjs/toolkit"
import cart from "./slices/cartSlice"

export default configurateStore({
  reducer: {
    cart,
  }
})