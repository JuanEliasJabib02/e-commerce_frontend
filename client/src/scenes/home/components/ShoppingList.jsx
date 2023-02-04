import React, { useEffect, useState } from 'react'
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../../state/slices/cartSlice"
import axios from "axios"

const ShoppingList = () => {

  const dispatch = useDispatch()
  const [value, setValue] = useState("all")
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery("(min-width_600px)")
  
  const handleChange = (event, newValue) => {
    setValue(newValue)

  }

  useEffect(() => {
  const URL = "http://localhost:1337/api/items"

  axios.get(URL)
    .then(res => dispatch(setItems(res.data)))
    .catch(err => console.log(err))
  },[]) 

  console.log(items)



  
  return (
    <div>ShoppingList</div>
  )
}

export default ShoppingList