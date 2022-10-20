import React, { useEffect, useState,useContext } from 'react'
import { Button, Grid, Paper, TextField, Typography,Box } from '@mui/material'
import { store } from '../../App'
import axios from 'axios'
import { useFormik } from "formik";
import {profileSchema} from '../FormsValidations/Profile'
import {useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {
  const {token,data} = useContext(store)
  const [notification,setNotification] = useState("")
  const navigate = useNavigate()
  const [date, setDate] = useState(new Date)
  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit,} = useFormik({
    initialValues: {age: "",number:"",gender:""},
    validationSchema:profileSchema ,
    onSubmit :async (values,action)=>{
      await  axios.put("https://guvi-task-intern.herokuapp.com/users/update-profile",{...values,"dob":date},{
        headers: {
          "token":token
        }
      })
        .then((res)=>{
              setNotification(res.data.statusCode)
              setTimeout(() => {
                navigate('/profile')
            }, 2500);
        })
        .catch((err)=>console.log(err))
        action.resetForm()
    },
    onChange:(values)=>{
        console.log(values)
    }
  });



  const notifications = ()=>{
    if(notification  === 422){
      toast.warning("Please fill all the fields", {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "colored",});
        setNotification("")
    }
    else if (notification === 500){
      toast.error("Error", {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "colored",});
        setNotification("")
    }
    else if (notification === 200){
      toast.success("Updated Successfully", {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "colored",});
        setNotification("")
    }
  }
notifications()
useEffect(() => {
  if(!token) navigate('/login')
  }, [])
  

  return (
   <>
      <Grid container spacing={0} direction="column" alignItems="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={3}>  
                {
                  data && <>
                  <Typography textAlign='center' variant = 'h3' sx={{mt:4}}>Welcome {data.name}</Typography>
                  <Typography textAlign='center' variant = 'h6' sx={{mt:4}}>Update Your Details😀</Typography>
                  </>
                }
          <Grid item  component={Paper} sx={{width:400,height:450,pt:3}} elevation={6}>
            <Box sx={{mx: 4}}>
                  <Box component="form"  noValidate autoComplete='off' onSubmit={handleSubmit} >
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          label="Enter your age..."
                          name="age"
                          onChange={handleChange}
                          id="age"
                          type="number"
                          placeholder="Enter your Age"
                          onBlur={handleBlur}
                          value={values.age}
                        />
                        {errors.age && touched.age && <p className="error">{errors.age}</p>}
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          label="Mobile Number"
                          onChange={handleChange}
                          type="number"
                          name='number'
                          placeholder="Mobile Number"
                          onBlur={handleBlur}
                          value={values.number}
                        />
                          {errors.number && touched.number && (<p className="error">{errors.number}</p>)}
                          <select className='form_field registerdropdown' name='gender' onChange={handleChange} value={values.gender}>
                            <option value="none" selected  hidden>Select your Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                      {errors.gender && touched.gender && (<p className="error">{errors.gender}</p>)}
                      <DatePicker className='date-picker' selected={date} onChange={(date) => setDate(date)}   isClearable placeholderText="Enter your dateof Birth"/>
                      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >update profile</Button>
                  </Box>
            </Box>
            </Grid>
          </Grid>
    
      </Grid> 
      <ToastContainer />

   </>
  )
}

export default Dashboard