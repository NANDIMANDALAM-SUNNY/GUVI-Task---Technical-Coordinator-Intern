// import { Avatar } from '@mui/material'
// import axios from 'axios'
// import React, { useContext, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { store } from '../../App'


// const Navbar = () => {
// const {token} = useContext(store)


//   // const getProfile = async ()=>{
//   //   try {
//   //     const data = await axios.get("https://webscrapping-backend-task.herokuapp.com/users/get-profile",{
//   //       headers: {
//   //         "jwt-token" : token
//   //       }
//   //     }).then((res)=>setProfile(res.data.data))
//   //   } catch (error) {
//   //     console.log(error)
//   //   }
//   // }
//   useEffect(() => {
//     // getProfile()
//   }, [token])
//   // console.log(profile)


  
//   return (
//     <>
   
    
//     </>
//   )
// }

// export default Navbar;

// // {
// //   token && profile!==undefined? <>
// //   <nav class="navbar navbar-expand-sm navbar-dark " style={{background:"#2874F0"}}>
// // <div class="container-fluid">
// // <a class="navbar-brand" href="javascript:void(0)">
// // {/* <img src={logo} width="130x" height="35px"/>  */}
// //  </a>
// // <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
// //   <span class="navbar-toggler-icon"></span>
// // </button>
// // <div class="collapse navbar-collapse" id="mynavbar">
// //   <ul class="navbar-nav ms-auto">
// //     <li class="nav-item" >
// //         <form class="d-flex">
// //         <input class="form-control me-2" type="text" placeholder="Search mobile name"  onChange={(e)=>setSearch(e.target.value)}/>
// //       </form>
// //     </li>
// //     <li>
// //         <Avatar     component={Link}  >
// //         <Link to="/profile">
// //           <img src={profile.profile}  style={{borderRadius:"50%",height:"40px",width:"40px"}}/>
// //         </Link>
// //         </Avatar>
// //     </li>
// //   </ul>
// // </div>
// // </div>
// // </nav>
// //   </>:null
// // }









import React,{useState,useContext, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { store } from '../../App';
import {  useNavigate } from 'react-router-dom'
import axios from 'axios';


function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const navigate = useNavigate()

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const {setToken,setData,token,data} = useContext(store)

    const getData = async ()=>{
      await axios.get('http://localhost:8000/users/profile',{
        headers : {
          "token":token
        }
      }).then((res)=>setData(res.data.data))
  }
  
 
  const handleLogout  = ()=>{
    setToken(localStorage.removeItem("token"))
    navigate('/login')
    console.log('logged out')
  }

  useEffect(() => {
    getData()
  }, [token])


  return (
    <>
{
  token && data!==undefined ? <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
          
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              margin:'0px'
            }}
          >
            Guvi-Task
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={data.profile} alt='profile'/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Typography onClick={handleLogout} >Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>:null
}
</>
  );
}
export default ResponsiveAppBar;
