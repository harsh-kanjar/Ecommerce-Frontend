import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import productContext from '../context/products/productContext';
import { ShoppingCartRounded } from '@mui/icons-material';

function ProductCard(props) {
    const [cartItems, setCartItems] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const context = useContext(productContext);
    const { host } = context;

    useEffect(() => {
        props.getAllProduct();
    }, []);

    const addToCart = async (productId, quantity) => {
        try {
            const response = await fetch(`${host}/api/v1/product/addtocart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
                body: JSON.stringify({ productId, quantity }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server responded with:", errorText);
                throw new Error(`Server error: ${response.status} - ${response.statusText}`);
            }

            setSnackbarOpen(true);  // Open Snackbar on success
            const data = await response.json();
            console.log("Product added to cart successfully:", data.cartItem);
            setTimeout(() => setSnackbarOpen(false), 3000);
        } catch (error) {
            console.error("An error occurred while adding the product to the cart:", error);
        }
    };

    const removeFromCart = async (cartItemId) => {
        try {
            const response = await fetch(`${host}/api/v1/product/removefromcart/${cartItemId}`, {
                method: "DELETE",
                headers: {
                    "auth-token": localStorage.getItem('token'),
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server responded with:", errorText);
                throw new Error(`Server error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Product removed from cart successfully:", data.cartItem);
        } catch (error) {
            console.error("An error occurred while removing the product from the cart:", error);
        }
    };

    const handleCartClick = async (productId) => {
        const cartItem = cartItems.find(item => item.product === productId);

        if (cartItem) {
            const userConfirmed = window.confirm("Are you sure you want to remove it from the cart?");
            if (userConfirmed) {
                await removeFromCart(cartItem._id);
            }
        } else {
            await addToCart(productId, 1);
        }
    };

    const calculateDiscount = (price) => {
        if (price > 5000) return 20;
        if (price > 2000) return 15;
        if (price > 1000) return 10;
        if (price > 500) return 5;
        return 0;
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Product added successfully to cart!
                </Alert>
            </Snackbar>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, margin: 2 }}>
                {props.products.map((product) => {
                    const discount = calculateDiscount(product.price);
                    const originalPrice = product.price * (1 + discount / 100);

                    return (
                        <Card key={product._id} sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }}>
                            <CardOverflow>
                                <div style={{maxWidth:'200px', maxHeight:'400px',padding:'0 auto'}}>
                                    <img
                                        style={{maxWidth:'300px', maxHeight:'100%'}}
                                        src={product.featuredImage}
                                        alt={product.productName}
                                        loading="lazy"
                                    />
                                </div>
                            </CardOverflow>
                            <CardContent>
                                <Typography level="body-xs">{product.category}</Typography>
                                <Link
                                    to={`/productdetails/${product._id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Typography
                                        fontWeight="md"
                                        color="neutral"
                                        textColor="text.primary"
                                        overlay
                                        endDecorator={<ArrowOutwardIcon />}
                                    >
                                        {product.productName}
                                    </Typography>
                                </Link>
                                <Typography
                                    color='success'
                                    level="title-lg"
                                    sx={{ mt: 1, fontWeight: 'xl' }}
                                    endDecorator={
                                        <Chip component="span" size="sm" variant="soft" color="success">
                                            {discount}% off
                                        </Chip>
                                    }
                                >
                                    <del>₹{originalPrice.toFixed(2)}/-</del>  -  ₹{product.price}/-
                                </Typography>
                                <Typography level="body-sm">
                                    Hurry up, only <b>{product.countOfStock}</b> left in stock!
                                </Typography>
                                <Typography sx={{ marginTop: 1 }} variant="p" level="body-sm" gutterBottom>Select size in cart: available in all sizes</Typography>
                            </CardContent>
                            <CardOverflow>
                                {
                                    localStorage.getItem('token') ?

                                        <Button onClick={() => handleCartClick(product._id)} variant="contained" startIcon={<ShoppingCartRounded />}>
                                            Add item
                                        </Button>

                                        :
                                        <Button title='Login Required' variant="contained" >
                                           <ShoppingCartRounded /> Add item
                                        </Button>
                                }
                            </CardOverflow>
                        </Card>
                    );
                })}
            </Box>
        </>
    );
}

export default ProductCard;
