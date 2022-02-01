import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UpdateProduct.css';

const UpdateProduct = () => {
    const [updateProducts,setUpdateProducts]=useState([]);
    const {id}=useParams();
    useEffect(()=>{
        fetch(`http://localhost:5000/products/${id}`)
        .then(res=>res.json())
        .then(data=>setUpdateProducts(data))
    },[]);

     //update product namme
     const handleProductNameChange=e=>{
        const updatedProductName=e.target.value;
        const updatedProduct={name:updatedProductName,description:updateProducts.description, price:updateProducts.price, img: updateProducts.img}
        setUpdateProducts(updatedProduct);
    };
    //update product description
     const handleProductDescriptionChange=e=>{
        const updatedProductDescription=e.target.value;
        const updatedProduct={name:updateProducts.name,description:updatedProductDescription, price:updateProducts.price, img: updateProducts.img}
        setUpdateProducts(updatedProduct);
    };
    // handle product price
     const handleProductPriceChange=e=>{
        const updatedProductPrice=e.target.value;
        const updatedProduct={name:updateProducts.name,description:updateProducts.description, price:updatedProductPrice, img: updateProducts.img}
        setUpdateProducts(updatedProduct);
    };
    //handle product URL
     const handleProductURLChange=e=>{
        const updatedProductURL=e.target.value;
        const updatedProduct={name:updateProducts.name,description:updateProducts.description, price:updateProducts.price, img: updatedProductURL}
        setUpdateProducts(updatedProduct);
    };

    //handle to update a product
    const handleUpdateProduct=e=>{
        const url=`http://localhost:5000/products/${id}`;
        fetch(url,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(updateProducts)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount>0){
                alert("Updated Successfully.")
                setUpdateProducts({});
            }
        })
        e.preventDefault();
    }

    return (
        <Container>
            <Grid container spacing={2}> 
                <Grid item xs={12} md={6} style={{marginTop:'180px'}}>
                <Typography variant="overline" display="block" gutterBottom style={{color:'tomato',fontSize:'20px'}}>Update Product:{updateProducts.name}</Typography>
            <form onSubmit={handleUpdateProduct} className='updateProduct'>
                <TextField
                    sx={{width:'75%',m:1}}
                    type="text"
                    onChange={handleProductNameChange}
                    value={updateProducts.name || ''}
                    variant="standard" />
                <textarea
                    sx={{width:'150%',m:1}}
                    type="text"
                    onChange={handleProductDescriptionChange}
                    value={updateProducts.description || ''}
                    variant="standard" />
                <TextField
                    sx={{width:'75%',m:1}}
                    type="number"
                    onChange={handleProductPriceChange}
                    value={updateProducts.price || ''}
                    variant="standard" />
                <TextField
                    sx={{width:'75%',m:1}}
                    type="img"
                    onChange={handleProductURLChange}
                    value={updateProducts.img || ''}
                    variant="standard" />
                    <Button sx={{width:'75%',m:1}} type="submit" variant="contained">Update</Button>
            </form>
                </Grid>
                <Grid item xs={12} md={6}>
                <img style={{width:'100%',marginTop:'100px'}} src={updateProducts.img} alt=""/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UpdateProduct;