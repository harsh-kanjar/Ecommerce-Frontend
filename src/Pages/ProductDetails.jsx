import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';  
import { ShoppingBag } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import productContext from '../context/products/productContext';
import Products from './Products';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    
    const context = useContext(productContext);
    const { host } = context;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${host}/api/v1/product/getproduct/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id, host]);

    const addToCart = async () => {
        try {
            const response = await fetch(`${host}/api/v1/product/addtocart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
                body: JSON.stringify({ productId: id, quantity: 1 }),
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

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    if (!product) return <Typography>Loading...</Typography>;

    return (
        <Container className='my-4'>
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

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Carousel>
                        {[product.featuredImage, product.subImage1, product.subImage2, product.subImage3].map((img, index) => (
                            <Box key={index} component="img" src={img} alt={`Product image ${index + 1}`} sx={{ width: '100%', height: 'auto' }} />
                        ))}
                    </Carousel>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>{product.productName}</Typography>
                    <Typography variant="h6" gutterBottom>Brand: {product.brand}</Typography>
                    <Typography variant="body1" gutterBottom>Category: {product.category}</Typography>
                    <Typography variant="body2" gutterBottom>Rating: ⭐⭐⭐⭐⭐ {product.rating}</Typography>
                    <Typography variant="h5" gutterBottom>Price: ₹{product.price}/-</Typography>
                    <Typography variant="body1" gutterBottom>Description: {product.description}</Typography>
                    <Typography variant="body1" gutterBottom>{product.richDescription}</Typography>
                    <Typography variant="body1" gutterBottom>Stock: {product.countOfStock} available</Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<ShoppingBag />} 
                        onClick={addToCart}
                    >
                        Add to Cart
                    </Button>
                </Grid>
            </Grid>
            <Products/>
        </Container>
    );
}

export default ProductDetails;
