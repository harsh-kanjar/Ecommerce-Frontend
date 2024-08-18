import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';  
import { ShoppingBag } from '@mui/icons-material';

import productContext from '../context/products/productContext';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const context = useContext(productContext);  
    const { host,setPrice } = context; //destructuring

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
    }, [id]);

    if (!product) return <Typography>Loading...</Typography>;

    return (
        <Container className='my-4'>
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
                    <Button variant="contained" color="primary" startIcon={<ShoppingBag />}>Add to Cart</Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProductDetails;
