import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { store } from '../../App'
import axios from 'axios'
import { useFormik } from "formik";
import {profileSchema} from '../FormsValidations/Profile'
import { Link as RouterLink,useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const Dashboard = () => {
  const {token,data} = useContext(store)
  const [notification,setNotification] = useState("")
  const navigate = useNavigate()
  const [date, setDate] = useState(new Date)
  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit,} = useFormik({
    initialValues: {
      age: "",
      number:"",
      gender:""
    },
    validationSchema:profileSchema ,
    onSubmit :async (values,action)=>{
      // await  axios.post("http://localhost:8000/users/register",{values})
      //   .then((res)=>{
      //       console.log(res.data)
      //         setNotification(res.data.statusCode)
      //         setTimeout(() => {
      //           navigate('/profile')
      //       }, 5000);
      //   })
      //   .catch((err)=>{
      //       console.log(err);
      //       alert(err)
      //   })
      console.log(values)
        action.resetForm()
    },
    onChange:(values)=>{
        console.log(values)
    }
  });








useEffect(() => {
if(!token) navigate('/login')
}, [])


console.log(date)


  return (
   <>
      <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  style={{ minHeight: '100vh' }}
>

  <Grid item xs={3}>
  <Grid item  component={Paper} sx={{width:400,height:350,pt:3}} elevation={6}>
     
    <Box
          sx={{
            mx: 4,          
          }}
        >
          <Box component="form"  noValidate autoComplete='off' onSubmit={handleSubmit} >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  name="age"
                
                  onChange={handleChange}
                  id="age"
                  type="number"
                  placeholder="Enter your Age"
                  onBlur={handleBlur}
                  value={values.age}
                />
                {errors.age && touched.age && <p className="error">{errors.age}</p>}
                <DatePicker selected={date} onChange={(date) => setDate(date)}     isClearable placeholderText="Enter your dateof Birth"/>

                  <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Mobile Number"
                  onChange={handleChange}
                  id="Mobile Number"
                  type="number"
                  placeholder="Mobile Number"
                  onBlur={handleBlur}
                  value={values.number}
                                />
                  {errors.number && touched.number && (<p className="error">{errors.number}</p>)}


                  <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Gender"
                  onChange={handleChange}
                  id="Gender"
                  type="text"
                  placeholder="Gender"
                  onBlur={handleBlur}
                  value={values.gender}
                                />
                  {errors.gender && touched.gender && (<p className="error">{errors.gender}</p>)}


                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign up
                    </Button>
          </Box>
        </Box>
             

    </Grid>
   </Grid>
   
</Grid> 


   </>
  )
}

export default Dashboard