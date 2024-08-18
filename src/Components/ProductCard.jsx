import { ShoppingBag, ShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';

function ProductCard(props) {
    const [cartItems, setCartItems] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        props.getAllProduct();
    }, []);

    const addToCart = async (productId, quantity) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/product/addtocart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
                body: JSON.stringify({ productId, quantity }),
            });

            if (!response.ok) {
                setSuccess(false);
                const errorText = await response.text();
                console.error("Server responded with:", errorText);
                throw new Error(`Server error: ${response.status} - ${response.statusText}`);
            }

            setSuccess(true);
            const data = await response.json();
            console.log("Product added to cart successfully:", data.cartItem);

            // Hide alert after 3 seconds
            setTimeout(() => setSuccess(false), 3000);

        } catch (error) {
            console.error("An error occurred while adding the product to the cart:", error);
        }
    };

    const removeFromCart = async (cartItemId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/product/removefromcart/${cartItemId}`, {
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

    return (
        <>
            {
                success && (
                    <Alert variant="filled" severity="success">
                        Product added successfully to cart
                    </Alert>
                )
            }
            <div style={{ marginLeft: '3%' }}>
                <h1 className="mt-4">Products:</h1>
                <div className="card-group">
                    {props.products.map((product) => (
                        <span key={product._id}>
                            <div className="card m-2" style={{ width: '20rem' }}>
                                <Link to={`/productdetails/${product._id}`} style={{ textDecoration: 'none' }} title="view product in detail">
                                    <img
                                        style={{ objectFit: 'cover', height: '210px', width: '100%' }}
                                        src={product.featuredImage}
                                        className="card-img-top"
                                        alt="Product"
                                    />
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {product.productName} - ₹{product.price}/-
                                    </h5>
                                    <p className="card-text">
                                        {product.description.length > 50
                                            ? `${product.description.slice(0, 35)}...`
                                            : product.description}
                                    </p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{product.brand}</li>
                                    <li className="list-group-item">
                                        Hurry up only - {product.countOfStock} left
                                    </li>
                                    <li className="list-group-item">⭐⭐⭐⭐⭐ {product.rating}</li>
                                </ul>
                                <div className="card-body">
                                    <Link to="/makeorder">
                                        <Button variant="contained" className="mx-2">
                                            Buy Now
                                        </Button>
                                    </Link>
                                    {
                                        !localStorage.getItem('token') && <Link to='/login' style={{ textDecoration: 'none' }} title="Please Login in to access Cart"> <Button variant="outlined" ><ShoppingBag /></Button></Link>
                                    }
                                    {
                                        localStorage.getItem('token') && <Button variant="outlined" onClick={() => handleCartClick(product._id)} title="Add to Cart"><ShoppingBag /></Button>
                                    }
                                </div>
                            </div>
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ProductCard;
