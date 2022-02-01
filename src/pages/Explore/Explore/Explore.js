import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Container, Grid } from '@mui/material';
import Explores from '../Explores/Explores';

const Explore = () => {
    const [explores,setExplores]=useState([]);

    useEffect(()=>{
        fetch("http://localhost:5000/products")
        .then(res=>res.json())
        .then(data=>setExplores(data))
    },[])
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Container>
            <Typography sx={{ fontWeight: 500, m: 2, color: 'success.main' }} variant="h6" component="div">
                OUR PRODUCTS
            </Typography>
            <Typography sx={{ fontWeight: 600, m: 5 }} variant="h4" component="div">
                Products We Provide
            </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    explores.map(product => <Explores
                        key={product._id}
                        product={product}
                    ></Explores>)
                }
            </Grid>
        </Container>
    </Box>
    );
};

export default Explore;