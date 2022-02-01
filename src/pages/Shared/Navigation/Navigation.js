import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../../../images/logo.png'
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
const Navigation = () => {
  const {user,logOut}=useAuth();
    return (
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <img style={{width:'100px', height:'50px'}} src={logo} alt=""/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <NavLink to="/home" style={{textDecoration:'none',color:'white'}} sx={{ml:'60px'}}>
              <Button color="inherit">HOME</Button>
            </NavLink>
          <NavLink to="/explore" style={{textDecoration:'none',color:'white'}} sx={{ml:'60px'}}>
              <Button color="inherit">EXPLORE</Button>
            </NavLink>
          {
            user?.email ?
            <Box >
            <NavLink to="/dashboard" style={{textDecoration:'none',color:'white'}}>
            <Button color="inherit">DASHBOARD</Button>
          </NavLink>
                {/* <Typography >{user.displayName}</Typography> */}
               <Button onClick={logOut} color="inherit">LOGOUT</Button>   
          </Box>
            :
              <NavLink to="/login" style={{textDecoration:'none',color:'white'}}>
              <Button color="inherit">LOGIN</Button>
            </NavLink>
          }
        </Toolbar>
      </AppBar>
    </Box>
    );
};

export default Navigation;