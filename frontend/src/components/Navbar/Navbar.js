import React,{useState,useContext, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { store } from '../../App';
import {  useNavigate } from 'react-router-dom'
import axios from 'axios';


function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {setToken,setData,token,data} = useContext(store)
  const navigate = useNavigate()
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget) ;
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const getData = async ()=>{
    try {
        await axios.get('https://guvi-task-intern.herokuapp.com/users/profile',{
        headers : {
          "token":token
        }
      }).then((res)=>setData(res.data.data))
    } catch (error) {
      console.log(error)
      alert(error)
    }
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
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
