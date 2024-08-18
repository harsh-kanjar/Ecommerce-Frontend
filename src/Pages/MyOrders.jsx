import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Paper, Grid, Box, Button } from '@mui/material';

import productContext from '../context/products/productContext';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    const context = useContext(productContext);
    const { host } = context; //destructuring

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${host}/api/v1/product/getallorders`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    }
                });

                const result = await response.json();
                if (response.ok) {
                    setOrders(result);
                } else {
                    console.error('Failed to fetch orders:', result.message);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await fetch(`${host}/api/v1/product/getallproducts`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const productResult = await response.json();
                if (response.ok) {
                    setProducts(productResult);
                } else {
                    console.error('Failed to fetch products:', productResult.message);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchOrders();
        fetchProducts();
    }, []);

    const findProductById = (id) => {
        return products.find(product => product._id === id);
    };

    return (
        <Container>
            <Typography className='my-4' variant="h4" gutterBottom>
                My Orders
            </Typography>
            {orders.length === 0 ? (
                <Typography>No orders found</Typography>
            ) : (
                orders.map((order) => (
                    <Paper key={order._id} sx={{ marginBottom: 2, padding: 2,backgroundColor:'#E8E8E8', boxShadow: '0px 5px 35px rgba(202, 198, 198, 0.35)', borderRadius:'16px'  }}>
                        <Typography variant="h6">Order ID: <ins>{order._id}</ins></Typography>
                        <Typography>Order Status: <strong>{order.status || <span style={{ color: 'black', backgroundColor: '#FFFF00', padding: '4px',borderRadius:'10px' }}>Pending</span>}</strong></Typography>
                        <Typography>Full Name: {order.fullName}</Typography>
                        <Typography>Address: {order.address}, {order.line2}, {order.city}, {order.state}, {order.zip}, {order.country}</Typography>
                        <Typography>Phone: {order.phone}</Typography>
                        <Typography>Total Price: ₹{order.totalPrice}</Typography>
                        <Typography>Payment Mode: {order.paymentMode || "Cash On Delivery"}</Typography>
                        <Typography>Coupon Code: {order.couponCode ? order.couponCode : 'N/A'}</Typography>
                        <Typography>Date Ordered:   {new Date(order.dateOrdered).toLocaleDateString()} </Typography>
                        <Typography><ins>Delivered in 7 working days</ins></Typography>
                        <Box mt={2}>
                            <Typography variant="subtitle1">Order Items:</Typography>
                            <Grid container spacing={2}>
                                {order.orderItems.map((item) => {
                                    const product = findProductById(item.product);
                                    return (
                                        <Grid item xs={12} sm={6} md={4} key={item._id} >
                                            <Paper sx={{ padding: 2 }} style={{borderRadius:'14px',backgroundColor:'#E8E8E8'}}>
                                                {product && (
                                                    <>
                                                        <img src={product.featuredImage} alt={product.name} style={{marginBottom:'2%',width: '300px', height: '200px', objectFit: 'cover',borderRadius:'6px' }} />
                                                        <Typography><strong>{product.productName}</strong></Typography>
                                                        <Typography>Price: ₹{product.price}</Typography>
                                                        <Typography>Quantity: {item.quantity}</Typography>
                                                    </>
                                                )}
                                            </Paper>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                        <hr />
                        <div className='my-4 bg-secondary p-4' style={{borderRadius:'16px'}}>
                            <p style={{color:'white'}}><strong>Only if status is <span style={{ color: 'black', backgroundColor: '#FFFF00', padding: '4px',borderRadius:'10px' }}>Pending</span> you can cancel the order</strong></p>
                            <Button style={{borderRadius:'10px'}} variant="contained" color="error"> Cancel Order  </Button>
                        </div>
                        <hr />
                    </Paper>
                ))
            )}
        </Container>
    );
};

export default Orders;
