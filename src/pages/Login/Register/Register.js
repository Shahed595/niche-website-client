import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import login from '../../../images/login.jpg'

const Register = () => {
    const[loginData,setLoginData]=useState({});

    const navigate=useNavigate();

    const {user,registerUser,isLoading,authError}=useAuth();

    const handleOnBlur=e=>{
        const field=e.target.name;
        const value=e.target.value;
        const newLoginData={...loginData}
        // console.log(field,value,newLoginData);
        newLoginData[field]=value;
        setLoginData(newLoginData);

    }

    const handleLoginSubmit=e=>{
        if(loginData.password!==loginData.password2){
            alert('Your Password Did Not Match');
            return;
        }
        registerUser(loginData.email, loginData.password,loginData.name, navigate)
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6} style={{marginTop:'180px'}}>
                <Typography variant="overline" display="block" gutterBottom>REGISTER</Typography>
                {!isLoading && <form onSubmit={handleLoginSubmit}>
                <TextField
                    sx={{width:'75%',m:1}}
                    id="standard-basic"
                    label="Your Name"
                    name="name"
                    onBlur={handleOnBlur} 
                    variant="standard" />
                <TextField
                    sx={{width:'75%',m:1}}
                    id="standard-basic"
                    label="Your Email"
                    name="email"
                    type="email"
                    onBlur={handleOnBlur} 
                    variant="standard" />
                <TextField 
                    sx={{width:'75%',m:1}}
                    id="standard-basic"
                    label="Your Password"
                    type="password"
                    name="password"
                    onBlur={handleOnBlur} 
                    variant="standard" />
                <TextField 
                    sx={{width:'75%',m:1}}
                    id="standard-basic"
                    label="Re-Type Password"
                    type="password"
                    name="password2"
                    onBlur={handleOnBlur} 
                    variant="standard" />
                    <Button sx={{width:'75%',m:1}} type="submit" variant="contained">Register</Button>
                    <NavLink 
                        style={{textDecoration:'none'}}
                        to="/login">
                        <Button variant='text'>Already Registered? Please Login</Button>
                    </NavLink>
                </form>}
                {isLoading && <CircularProgress />}
                {user?.email && <Alert severity="success">Registration Successfull</Alert>}
                {authError && <Alert severity="error">{authError}</Alert>}
            </Grid>
            <Grid item xs={12} md={6}>
                <img style={{width:'100%',marginTop:'100px'}} src={login} alt=""/>
            </Grid>
            </Grid>
        </Container>
    );
};

export default Register;