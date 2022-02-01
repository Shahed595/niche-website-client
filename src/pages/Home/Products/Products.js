import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Container, Grid } from '@mui/material';
import Product from '../Product/Product';

const Products = () => {
    const [products,setProducts]=useState([])
    useEffect(()=>{
        fetch("http://localhost:5000/products")
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[])
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Container>
            <Typography sx={{ fontWeight: 600, m: 5 }} variant="h4" component="div" style={{color:'#6495ED'}}>
                Brands We Provide
            </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    products.slice(0,6).map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }
            </Grid>
        </Container>
    </Box>
    );
};

export default Products;