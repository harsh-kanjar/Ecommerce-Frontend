import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Paper, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import productContext from '../context/products/productContext';
import DialogueBox from '../Components/DialogueBox';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import TypographyJoy from '@mui/joy/Typography';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    const context = useContext(productContext);
    const { host } = context;

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
                    const sortedOrders = result.sort((a, b) => new Date(b.dateOrdered) - new Date(a.dateOrdered));
                    setOrders(sortedOrders);
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
    }, [host]);

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
                    <Paper key={order._id} sx={{ marginBottom: 2, padding: 2, backgroundColor: '#E8E8E8', boxShadow: '0px 5px 35px rgba(202, 198, 198, 0.35)', borderRadius: '16px' }}>
                        <Typography variant="h6">Order ID: <ins>{order._id}</ins></Typography>
                        <Typography>Order Status: <strong style={{ color: 'black', backgroundColor: '#FFFF00', padding: '4px', borderRadius: '10px' }}>{order.status || <span style={{ color: 'black', backgroundColor: '#FFFF00', padding: '4px', borderRadius: '10px' }}>Pending</span>}</strong></Typography>
                        <Typography>Full Name: {order.fullName}</Typography>
                        <Typography>Address: {order.address}, {order.line2}, {order.city}, {order.state}, {order.zip}, {order.country}</Typography>
                        <Typography>Phone: {order.phone}</Typography>
                        <Typography>Total Price: ₹{order.totalPrice}</Typography>
                        <Typography>Payment Mode: {order.paymentMode || "Cash On Delivery"}</Typography>
                        <Typography>Coupon Code: {order.couponCode ? order.couponCode : 'N/A'}</Typography>
                        <Typography>Date Ordered: {new Date(order.dateOrdered).toLocaleDateString()} </Typography>
                        <Typography><ins>Delivered in 7 working days</ins></Typography>
                        <Box mt={2}>
                            <Typography variant="subtitle1">Order Items:</Typography>
                            <Grid container spacing={2}>
                                {order.orderItems.map((item) => {
                                    const product = findProductById(item.product);
                                    return (
                                        <Grid item xs={12} sm={6} md={4} key={item._id}>
                                            {product && (
                                                <Box
                                                    sx={{
                                                        perspective: '1000px',
                                                        transition: 'transform 0.4s',
                                                        '& > div, & > div > div': {
                                                            transition: 'inherit',
                                                        },
                                                        '&:hover': {
                                                            '& > div': {
                                                                transform: 'rotateY(30deg)',
                                                                '& > div:nth-child(2)': {
                                                                    transform: 'scaleY(0.9) translate3d(20px, 30px, 40px)',
                                                                },
                                                                '& > div:nth-child(3)': {
                                                                    transform: 'translate3d(45px, 50px, 40px)',
                                                                },
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <Card
                                                        variant="outlined"
                                                        sx={{
                                                            minHeight: '280px',
                                                            width: 300,
                                                            backgroundColor: '#fff',
                                                            borderColor: '#000',
                                                        }}
                                                    >
                                                        <Link to={`/productdetails/${product._id}`} style={{ textDecoration: 'none', color: 'black' }} title="View product in detail">
                                                            <TypographyJoy level="h2" fontSize="lg" textColor="#000">
                                                                {product.productName}
                                                            </TypographyJoy>
                                                            <CardCover
                                                                sx={{
                                                                    background:
                                                                        'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                                                                    border: '1px solid',
                                                                    borderColor: '#777',
                                                                    backdropFilter: 'blur(1px)',
                                                                    // width:'290px'
                                                                }}
                                                            >
                                                                <img src={product.featuredImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                            </CardCover>
                                                            <CardContent
                                                                sx={{
                                                                    alignItems: 'self-start',
                                                                    justifyContent: 'flex-start',
                                                                    background: 'linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0.3))',
                                                                    border: '1px solid',
                                                                    borderColor: '#000',
                                                                    backdropFilter: 'blur(2px)',
                                                                }}
                                                            >
                                                                <TypographyJoy textColor="#fff">
                                                                    <span>Order ID:</span> <span><ins>{order._id}</ins></span>  
                                                                </TypographyJoy>
                                                                <TypographyJoy level="h2" fontSize="lg" textColor="#fff"  >
                                                                   Price: ₹{product.price}
                                                                </TypographyJoy>
                                                                <TypographyJoy textColor="#fff">Quantity: {item.quantity}</TypographyJoy>
                                                                <TypographyJoy textColor="#fff">Size: {item.size}</TypographyJoy>
                                                            </CardContent>
                                                        </Link>
                                                    </Card>
                                                </Box>
                                            )}
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                        {
                            (order.status === "pending" || order.status === "Pending") && (
                                <div className='my-4 p-4' style={{ borderRadius: '16px', backgroundColor: '#669bec' }}>
                                    <p style={{ color: 'white' }}>
                                        <strong>
                                            Only if status is <span className='mx-1' style={{ color: 'black', backgroundColor: '#FFFF00', padding: '4px', borderRadius: '10px' }}>  Pending  </span> you can cancel the order
                                        </strong>
                                    </p>
                                    <DialogueBox
                                        text="Cancel Order"
                                        alert="Are you sure?"
                                        message="Are you sure you want to cancel this order?"
                                    />
                                    <hr />
                                </div>
                            )
                        }
                    </Paper>
                ))
            )}
        </Container>
    );
};

export default MyOrders;
