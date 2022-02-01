import {Container, Grid,Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import './PurchasePage.css';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';


const PurchasePage = () => {
    const {productId}=useParams();
    const[product,setProduct]=useState({});
    const {user}=useAuth();

    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const onSubmit = data =>{
        axios.post('http://localhost:5000/orders',data)
        .then(res=>{
            // console.log(res);
            if(res.data.insertedId){
                alert('Orderd Placed Successfully');
                reset();
            }
        })
    }

     


    useEffect(()=>{
        fetch(`http://localhost:5000/products/${productId}`)
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[])
    return (
        <Container>
            <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={5} sm={12}>
                    <img src={product.img} alt="" style={{width:'120%'}}></img>
                    <br></br>
                    <h2><span style={{color:'orange', weight:'800'}}>Car Name</span> : {product.name}</h2>
                    <h4 style={{color:'tomato', weight:'800'}}>{product.description}</h4>
                    <h3 style={{color:'#4B0082', weight:'300'}}>Price:${product.price}</h3>
                </Grid>
                <Grid item xs={12} md={7} sm={12} className='addOrder' sx={{mt:'100px'}}>
                    <h3 style={{color:'maroon'}}>Place Your Order</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input defaultValue={product.name} {...register("productName")} />
                        <input placeholder="Product Price" defaultValue={product.price}{...register("productPrice")} />
                        <input defaultValue={user.displayName} {...register("name")} />
                        <input defaultValue={user.email}{...register("email", { required: true })}/>
                        <input placeholder="Address" defaultValue="" {...register("address")} />
                        <input type="number" placeholder="Phone Number" defaultValue="" {...register("number")} />
                        <input type="submit" style={{color:'navy'}}/>
                    </form>
                </Grid>
        </Grid>
            </Box>
        </Container>
    );
};

export default PurchasePage;