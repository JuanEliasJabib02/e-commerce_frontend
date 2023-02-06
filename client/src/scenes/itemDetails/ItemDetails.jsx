
import {Box, IconButton, Typography, Button, Tabs, Tab} from "@mui/material"
import React, { useEffect, useState } from 'react'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { shades } from "../../theme"
import { addToCart } from "../../state/slices/cartSlice"
import { useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import Item from "../../components/Item"
import axios from "axios"

const ItemDetails = () => {

  const dispatch = useDispatch()
  const { itemId } = useParams()
  const [value, setValue] = useState("description")
  const [count, setCount] = useState(1)
  const [item, setItem] = useState(null)
  const [items, setItems] = useState([])

  const handleChange = () => {
    setValue(newValue)
  }
  

  useEffect(() => {
    const URL = `http://localhost:1337/api/items/${itemId}?populate=image`
    axios.get(URL)
      .then(res => setItem(res.data.data.attributes))
      .catch(err => console.log(err))
  }, [itemId])
  
  useEffect(() => {
    const URL = "http://localhost:1337/api/items?populate=image"
    axios.get(URL)
      .then(res => setItems(res.data.data))
      .catch(err => console.log(err))
    }, [itemId])

  
  const itemUrlImage = item?.image?.data?.attributes?.formats?.medium?.url

  
  
  
  
  return (
    < Box
      width="80%"
      m="80px auto"
    >
      < Box
        display="flex"
        flexWrap="wrap"
        columnGap="40px"

      >
        {/* Images */}
        < Box
          flex="1 1 40%"
          mb="40px"
        >
          <img
            src={`http://localhost:1337${itemUrlImage}`}
            alt={item?.name}
            width="100%"
            height="100%"
            style={{
              objectFit: "contain"
            }}
          />    
        </Box>
        {/* Actions */}
        < Box
          flex="1 1 50%"
          mb="40px"
        >
          < Box
            display="flex"
            justifyContent="space-between"
          >
            <Box>Home/item</Box>
            <Box>Prev Next</Box>
          </Box>  
          < Box
            m="65px 0 25px 0"
          >
            < Typography variant="h3">{item?.name}</Typography>
            < Typography>{item?.price}</Typography>
            < Typography
              sx={{
                mt:"20px"
              }}
            >{ item?.longDescription}</Typography>
          </Box>

          {/*  Count and button */}
          < Box
            display="flex"
            alignItems="center"
            minHeight="50px"
          >
            < Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
               <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
               <Typography sx={{p:"0 5px"}}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            < Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding:"10px 40px"
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          < Box>
            < Box m="20px 0 5px 0" display="flex">
              < FavoriteBorderOutlinedIcon />
              < Typography
                sx={{
                  ml:"5px"
                }}
              > Add to Wish List
              </Typography>
            </Box>
            < Typography>CATEGORIES:{item?.category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Information */}

      < Box m="20px 0">
        < Tabs value={value} onChange={handleChange}>
          < Tab label="DESCRIPTION" value="description" />
          < Tab label="REVIEWS" value="reviews"/>
        </Tabs>
        < Box display="flex" flexWrap="wrap" gap="15px">
          {value === "description" && (
            <div>{item?.longDescription}</div>
          )}
           {value === "reviews" && (
            <div>Reviews</div>
          )}
        </Box>
      </Box>

      {/* Related items */}

      < Box
        mt="50px"
        width="100%"
      >
        < Typography
          variant="h3"
          fontWeight="bold"
        >
          Related Products
        </Typography>
        < Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.slice(0, 4).map((item, i) => (
            < Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>

    </Box>
  )
}

export default ItemDetails