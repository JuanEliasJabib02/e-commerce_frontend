import React from 'react'
import { Box, useMediaQuery, TextField} from "@mui/material"
import {getIn, validateYupSchema} from "formik"
const AddressForm = ({
  type,
  values,
  touched,
  errors,
  handleBlur,
  handleChange, 
}) => {

  const isNonMobile = useMediaQuery("(min-width:600px)")

  const formattedName = (field) => {
    `${type}.${field}`
  }

  const formattedError = () => {
    Boolean(
      getIn(touched, formattedName(field)) &&
      getIn(errors,formattedName(field))
    )
  }

  const formattedHelper = (field) => 
    getIn(touched, formattedName(field)) &&
    getIn(errors, formattedName(field))
  
  return (
    < Box
      display="grid"
      gap="15px"
      gridTemplateColumns="repeate(4,minmax(0,1fr))"
      sx={{
        "& > div" :{gridColumn: isNonMobile ? undefined : "span 4"}
      }}
    >
      < TextField
        fullWidth
        type="text"
        label="firstName"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        name={formattedName("firstName")}
        error={formattedError("firstName")}
        helperText={formattedHelper("firstName")}
        sx={{
          gridColumn:"span 2"
        }}
      />
    </Box>
  )
}

export default AddressForm