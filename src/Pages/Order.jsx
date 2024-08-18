import React, { useContext, useState } from "react";
import { Container, Grid, TextField, Button, Typography, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import productContext from '../context/products/productContext';

function Order() {
    const context = useContext(productContext);
    const { host, price } = context;

    const [orderDetails, setOrderDetails] = useState({
        fullName: '', phone: '', address: '', line2: '', city: '', state: '', zip: '', country: '', paymentMode: '', couponCode: '',
    });

    const handleChange = (e) => {
        setOrderDetails({
            ...orderDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${host}/api/v1/product/makeorder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(orderDetails)
            });

            const result = await response.json();
            if (response.status === 200) {
                console.log('Order placed successfully:', result);
                alert("Order placed successfully!");
            } else {
                console.error('Failed to place order:', result.message);
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginBottom: '4%', marginTop: '4%', padding: '12px', border: '1px solid transparent', borderRadius: '12px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.35)' }}>
            <Typography variant="h4" gutterBottom>Fill Required Information</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Full Name" name="fullName" variant="outlined" value={orderDetails.fullName} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Phone" name="phone" variant="outlined" value={orderDetails.phone} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Line 1" name="address" variant="outlined" value={orderDetails.address} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Line 2" name="line2" variant="outlined" value={orderDetails.line2} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="City" name="city" variant="outlined" value={orderDetails.city} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="State" name="state" variant="outlined" value={orderDetails.state} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Zip Code" name="zip" variant="outlined" value={orderDetails.zip} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Country" name="country" variant="outlined" value={orderDetails.country} onChange={handleChange} required />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Apply Coupon Code" name="couponCode" variant="outlined" value={orderDetails.couponCode} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth name="price" variant="outlined" value={`₹ ${price}/-`} InputProps={{ readOnly: true }} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Payment Mode</InputLabel>
                            <Select name="paymentMode" value={orderDetails.paymentMode} onChange={handleChange} label="Payment Mode" required>
                                <MenuItem value=""> <em>None</em> </MenuItem>
                                <MenuItem value="Credit Card">Credit Card</MenuItem>
                                <MenuItem value="Debit Card">Debit Card</MenuItem>
                                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                                <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '10px', borderRadius: '6px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.35)' }}>Proceed</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default Order;
