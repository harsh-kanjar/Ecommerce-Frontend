import React, { useState , useContext  } from 'react';
import { TextField, Button, Grid, Typography, Container, Box } from '@mui/material';

import productContext from '../context/products/productContext';
function MakeOrder() {
  const [formData, setFormData] = useState({ orderItems: '', line1: '', line2: '', city: '', zip: '', country: '', phone: '', });

  const context = useContext(productContext);  
  const { host } = context; //destructuring

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('token');

    try {
      const response = await fetch('/api/v1/product/makeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Order placed successfully');
        // Handle success (e.g., clear form, show message, etc.)
      } else {
        console.error('Failed to place order');
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" align="center">
          Place Your Order
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField variant="outlined" fullWidth label="Line 1" name="shippingAdress1" value={formData.line1} onChange={handleChange} required/>
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" fullWidth label="Line 2" name="shippingAdress2" value={formData.line2} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField variant="outlined" fullWidth label="City" name="city" value={formData.city} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField variant="outlined" fullWidth label="ZIP" name="zip" value={formData.zip} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField variant="outlined" fullWidth label="Country" name="country" value={formData.country} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField variant="outlined" fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} required/>
            </Grid>      
          </Grid>
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button type="submit" variant="contained" color="primary">  Place Order  </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default MakeOrder;
