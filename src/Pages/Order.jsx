import React, { useContext, useState, useEffect } from "react";
import { Container, Grid, TextField, Button, Typography, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import productContext from '../context/products/productContext';
import { useNavigate } from "react-router-dom";

function Order() {
    const context = useContext(productContext);
    const { host } = context;
    const navigate = useNavigate();

    const [orderDetails, setOrderDetails] = useState({
        fullName: '', phone: '', address: '', line2: '', city: '', state: '', zip: '', country: '', paymentMode: '', couponCode: '',
    });

    const [cartData, setCartData] = useState(null);

    useEffect(() => {
        const storedOrderDetails = localStorage.getItem('orderDetails');
        if (storedOrderDetails) {
            setCartData(JSON.parse(storedOrderDetails));
        } else {
            navigate('/cart');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setOrderDetails({
            ...orderDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitOrder = async () => {
        const data = {
            ...orderDetails,
            cartItems: cartData.cartProducts,
            totalPrice: cartData.totalPrice,
            totalQuantity: cartData.totalQuantity,
            totalDiscount: cartData.totalDiscount,
        };

        const response = await fetch(`${host}/api/v1/product/makeorder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
            navigate('/success');
        } else {
            console.error(result.error);
            navigate('/success');
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Typography variant="h4" gutterBottom>Order Details</Typography>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField name="fullName" label="Full Name" fullWidth required onChange={handleChange} value={orderDetails.fullName} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="phone" label="Phone" fullWidth required onChange={handleChange} value={orderDetails.phone} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="address" label="Address Line 1" fullWidth required onChange={handleChange} value={orderDetails.address} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="line2" label="Address Line 2" fullWidth onChange={handleChange} value={orderDetails.line2} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField name="city" label="City" fullWidth required onChange={handleChange} value={orderDetails.city} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField name="state" label="State" fullWidth required onChange={handleChange} value={orderDetails.state} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField name="zip" label="ZIP Code" fullWidth required onChange={handleChange} value={orderDetails.zip} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField name="country" label="Country" fullWidth required onChange={handleChange} value={orderDetails.country} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Payment Mode</InputLabel>
                            <Select name="paymentMode" value={orderDetails.paymentMode} onChange={handleChange}>
                                <MenuItem value="COD">Cash on Delivery</MenuItem>
                                <MenuItem value="Credit Card">Credit Card</MenuItem>
                                <MenuItem value="Debit Card">Debit Card</MenuItem>
                                <MenuItem value="UPI">UPI</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="couponCode" label="Coupon Code" fullWidth onChange={handleChange} value={orderDetails.couponCode} />
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" onClick={handleSubmitOrder} style={{ marginTop: '20px' }}>Submit Order</Button>
            </form>
        </Container>
    );
}

export default Order;
