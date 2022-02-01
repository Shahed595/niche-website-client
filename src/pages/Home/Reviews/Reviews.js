import React, { useEffect, useState } from 'react';
import SingleReviews from './SingleReviews/SingleReviews';
import { Grid,Typography,Container,Box } from '@mui/material';

const Reviews = () => {
    const[reviews,setReviews]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/reviews')
        .then(res=>res.json())
        .then(data=>setReviews(data))
    },[])
    return (
           <Box sx={{ flexGrow: 1,mt:'50px' }}>
               <Typography sx={{mb:'50px'}}>Reviews</Typography>
               <Container>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {reviews.map(Review=><SingleReviews
                    key={Review._id}
                    Review={Review}
                    ></SingleReviews>)}
                    </Grid>
           </Container>
           </Box>
    );
};

export default Reviews;