import React, {  useContext,useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Chip, Tooltip } from '@mui/material';
import { Link } from "react-router-dom";
import productContext from '../context/products/productContext';


function AddProduct() {
    const context = useContext(productContext); // Fetching products
    const { addProduct } = context; //destructuring

    const [productData, setProductData] = useState({
        productName: "", description: "", richDescription: "", featuredImage: "", subImage1: "", subImage2: "", subImage3: "", brand: "", price: "", category: "", countOfStock: "10", rating: "", isFeatured: "", keywords: []
    });

    const [keywordInput, setKeywordInput] = useState("");

    // Handle input changes
    const onChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    // Handle keyword input changes
    const handleKeywordInputChange = (e) => {
        setKeywordInput(e.target.value);
    };

    // Add keyword to the product data
    const handleAddKeyword = () => {
        if (keywordInput.trim() !== "") {
            setProductData({ ...productData, keywords: [...productData.keywords, keywordInput.trim()] });
            setKeywordInput(""); // Clear input after adding
        }
    };

    // Remove keyword from the product data
    const handleRemoveKeyword = (keywordToRemove) => {
        setProductData({ ...productData, keywords: productData.keywords.filter(keyword => keyword !== keywordToRemove) });
    };

    // Handle form submission
    // Ensure the correct data types are sent in the request body
    const handleEvent = async (e) => {
        e.preventDefault();

        const productDataWithCorrectTypes = {
            ...productData,
            price: parseFloat(productData.price),
            countOfStock: parseInt(productData.countOfStock),
            rating: parseFloat(productData.rating),
            isFeatured: productData.isFeatured === "true" ? true : false,
        };

        await addProduct(productDataWithCorrectTypes);
    };


    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', mt: 5 }}>
            <Typography variant="h4" gutterBottom>Add New Product</Typography>
            <p>Add Images in image gallery - <Link target="_blank" to="/admin/imagegallery">Gallery</Link></p>
            <form onSubmit={handleEvent}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField label="Product Name" name="productName" fullWidth value={productData.productName} onChange={onChange} required />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item xs={10}> <TextField label="Add Keyword" value={keywordInput} onChange={handleKeywordInputChange} fullWidth /> </Grid>
                            <Grid item xs={2}>  <Button variant="contained" onClick={handleAddKeyword}>Add</Button> </Grid>
                        </Grid>
                        <Box sx={{ mt: 2 }}>
                            {productData.keywords.map((keyword, index) => (
                                <Chip key={index} label={keyword} onDelete={() => handleRemoveKeyword(keyword)} sx={{ mr: 1, mb: 1 }} />
                            ))}
                        </Box>
                        <Tooltip title="Keywords help in search and SEO">
                            <span>
                                <Button style={{ fontSize: '14px' }} disabled>Why keywords?</Button>
                            </span>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Description" name="description" fullWidth value={productData.description} onChange={onChange} multiline rows={4} required />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Rich Description" name="richDescription" fullWidth value={productData.richDescription} onChange={onChange} multiline rows={4} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Brand" name="brand" fullWidth value={productData.brand} onChange={onChange} required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Price" name="price" fullWidth type="number" value={productData.price} onChange={onChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Category" name="category" fullWidth value={productData.category} onChange={onChange} required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Count of Stock" name="countOfStock" fullWidth type="number" value={productData.countOfStock} onChange={onChange} required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Rating" name="rating" fullWidth type="number" value={productData.rating} onChange={onChange} required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Featured" name="isFeatured" fullWidth value={productData.isFeatured} onChange={onChange} required />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Featured Image" name="featuredImage" fullWidth value={productData.featuredImage} onChange={onChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Subimage 1" name="subImage1" fullWidth value={productData.subImage1} onChange={onChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Subimage 2" name="subImage2" fullWidth value={productData.subImage2} onChange={onChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Subimage 3" name="subImage3" fullWidth value={productData.subImage3} onChange={onChange} />
                    </Grid>
                    <Grid item xs={12} className='mb-4'>
                        <Button type="submit" variant="contained" color="primary" fullWidth>Add Product</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default AddProduct;
