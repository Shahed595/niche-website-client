import React from 'react';
import { Grid,Card, CardMedia, CardContent, Typography } from '@mui/material';


const SingleReviews = ({Review}) => {
    const {img,name,review,rate}=Review;
    return (
        <Grid item xs={12} sm={4} md={6} >
            <Card sx={{ maxWidth: 300}}>
            <Grid sx={{justifyContent:'center' }}>
            <CardMedia
                component="img"
                // height="140"
                sx={{ borderRadius: '50%',width:'50%',ml:'60px'}}
                image={img}
            />
            </Grid>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {review}
                </Typography>
        <       Typography gutterBottom variant="h5" component="div">
                    Rate: {rate}
                </Typography>
      </CardContent>
    </Card>
  </Grid>
       

    );
};

export default SingleReviews;