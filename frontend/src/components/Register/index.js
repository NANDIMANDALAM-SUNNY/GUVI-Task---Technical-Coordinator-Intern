import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signUpSchema } from "../FormsValidations/SignupForm";
import React, { useState } from 'react'
import { useFormik } from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import FileBase64  from 'react-file-base64'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../images/logo.png' 
import '../Dashboard/style.css'

const Register = () => {
    const navigate = useNavigate();
    const [notification,setNotification] = useState("")
    const [img,setImg] = useState("")
    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit,} = useFormik({
      initialValues: {name: "",email: "",password: "" },
      validationSchema: signUpSchema,
      onSubmit :async (values,action)=>{
        await  axios.post("https://guvi-task-intern.herokuapp.com/users/register",{...values,"profile":img})
        .then((res)=>{
              setNotification(res.data.statusCode)
              setTimeout(() => {
                navigate('/login')
            }, 2500);
        })
        .catch((err)=>{
            console.log(err);
            alert(err)
        })
        action.resetForm()
      },
    });


  const notifications = ()=>{
    if(notification  === 409){
       toast.warning("User Already Exists", {position: "top-right",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "colored",});
        setNotification("")
    }
    else if (notification === 500){
      toast.error("Error", { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored", });
      setNotification("")
    }
    else if (notification === 200){
      toast.success("Successfully Registered", { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored", });
      setNotification("")
    }
  }
notifications()

    const handleChangeImage =async (e)=>{
         setImg(e.target.value, e.target.value);
     }

  return (    
    <>
      <Grid container justifyContent="center" alignItems="center">
          <img src={logo} style={{width:"200px",height:"200px"}}/>
      </Grid>
      <Grid container spacing={0} direction="column" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={3}>
            <Grid item  component={Paper} sx={{width:400,height:550,pt:3}} elevation={6}>
                 <Box sx={{my: 2,mx: 4}}>
                  <Box component="form"  noValidate autoComplete='off' onSubmit={handleSubmit} >
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Display Name"
                        id="name"
                        type="name"
                        onChange={handleChange}
                        placeholder="Enter your Name"
                        onBlur={handleBlur}
                        value={values.name}
                        />
                        {errors.name && touched.name ? (<p className='error'>{errors.name}</p>) : null}
                      <FileBase64 type="file" name='img' className='file-input' multiple={false} onDone={({base64}) => setImg( base64)}  onChange={handleChangeImage}/>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        onBlur={handleBlur}
                        value={values.email}
                        />              
                        {errors.email && touched.email && <p className="error">{errors.email}</p>}                   
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        onChange={handleChange}
                        id="password"
                        type="password"
                        placeholder="Enter Password"
                        onBlur={handleBlur}
                        value={values.password}
                        />
                      {errors.password && touched.password && (<p className="error">{errors.password}</p>)}
                      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Sign up</Button>
                  </Box>
                 </Box>
                  <Typography sx={{ml:3}} >Already having account ?  <Typography  component={RouterLink} to='/login'  sx={{color:"red",textDecoration:"none"}}>Login here</Typography></Typography>  
            </Grid>
        </Grid>
      </Grid> 
     <ToastContainer />
    </>

  );
};
export default Register;
