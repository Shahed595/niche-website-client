import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import login from '../../../images/login.jpg';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {

    const[loginData,setLoginData]=useState({});
    const {user,loginUser,isLoading,authError,signInUsingGoogle}=useAuth();

    const location= useLocation();
    const navigate=useNavigate();

    const handleOnChange=e=>{
        const field=e.target.name;
        const value=e.target.value;
        const newLoginData={...loginData}
        newLoginData[field]=value;
        setLoginData(newLoginData);

    }

    const handleGoogleSignIn=()=>{
        signInUsingGoogle(location,navigate);
    }

    const handleLoginSubmit=e=>{
        loginUser(loginData.email, loginData.password,location,navigate);
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6} style={{marginTop:'180px'}}>
                <Typography variant="overline" display="block" gutterBottom>LOGIN</Typography>
                {!isLoading &&<form onSubmit={handleLoginSubmit}>
                <TextField
                    sx={{width:'75%',m:1}}
                    id="standard-basic"
                    label="Your Email"
                    name="email"
                    onChange={handleOnChange} 
                    variant="standard" />
                <TextField 
                    sx={{width:'75%',m:1}}
                    id="standard-basic"
                    label="Your Password"
                    type="password"
                    name="password"
                    onChange={handleOnChange} 
                    variant="standard" />
                    <Button sx={{width:'75%',m:1}} type="submit" variant="contained">Login</Button>
                    <NavLink 
                        style={{textDecoration:'none'}}
                        to="/register">
                        <Button variant='text'>New User? Please Register</Button>
                    </NavLink>
                </form>}
                <p>-----------------OR----------------</p>
                <Button onClick={handleGoogleSignIn}><GoogleIcon></GoogleIcon></Button>
                {isLoading && <CircularProgress />}
                {user?.email && <Alert severity="success">Login Successfull</Alert>}
                {authError && <Alert severity="error">{authError}</Alert>}
            </Grid>
            <Grid item xs={12} md={6}>
                <img style={{width:'100%',marginTop:'100px'}} src={login} alt=""/>
            </Grid>
            </Grid>
        </Container>
    );
};

export default Login;