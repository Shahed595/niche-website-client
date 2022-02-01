import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';


const Product = ({product}) => {
    const{name,img,description,price,_id}=product;
    return (
  <Grid item xs={4} sm={4} md={4}>
      <Card sx={{ maxWidth: 275}}>
      <CardMedia
        component="img"
        height="140"
        image={img}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Price: ${price}
        </Typography>
        <NavLink to={`/purchasePage/${_id}`} style={{textDecoration:'none'}}>
          <Button variant="contained">Order Now</Button>
        </NavLink>
      </CardContent>
    </Card>
  </Grid>
    );
};

export default Product;