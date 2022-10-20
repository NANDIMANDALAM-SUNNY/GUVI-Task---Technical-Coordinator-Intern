import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useContext, useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { store } from '../../App'

const Profile = () => {
    const [profile, setProfile] = useState(null)
    const {token}= useContext(store)
    const navigate = useNavigate()
    const profileData = async ()=>{
        await axios.get('https://guvi-task-intern.herokuapp.com/users/profile',{
            headers : {
              "token":token
            }
          }).then((res)=>setProfile(res.data.data))
    }
    useEffect(() => {
    if(!token) navigate('/login')
    profileData()
    }, [])
    console.log(profile)
  return (
    <>  
       {
        profile && <>
         <Grid container sx={{mt:5}}>
            <Grid item xs={3} md={3}></Grid>
            <Grid item xs={3} md={3} >
            <Box sx={{width:"150px",height:"150px"}} >
                <img src={profile.profile} style={{maxWidth:"100%",maxHeight:"100%"}}   />
            </Box>
            </Grid>
            <Grid item xs={3} md={6}>
                <Typography variant='h6'> Name :  {profile.name}</Typography>
                <Typography variant='h6'> Email :  {profile.email}</Typography>
                <Typography variant='h6'> Age :  {profile.age}</Typography>
                <Typography variant='h6'> Mobile number :  {profile.number}</Typography>
                <Typography variant='h6'> Date of birth :  {profile.dob}</Typography>
                <Typography variant='h6'> Gender :  {profile.gender}</Typography>
            </Grid>
        </Grid>
        </>
        }
    </>
  )
}

export default Profile