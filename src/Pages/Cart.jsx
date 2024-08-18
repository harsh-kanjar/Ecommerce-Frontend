import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import DialogueBox from "../Components/DialogueBox";
import Alert from '@mui/material/Alert';
import { Link } from "react-router-dom";

import { useContext } from "react";
import productContext from '../context/products/productContext';

function Cart() {
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [success, setSuccess] = useState(false);

    const context = useContext(productContext);  
    const { host,setPrice } = context; //destructuring

    const deliveryCharges = 100;
    const getAllCartItems = async () => {
        const response = await fetch(`${host}/api/v1/product/getcartproducts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
        });

        const json = await response.json();
        if (json.cartItems) {
            setCartProducts(json.cartItems);
            calculateTotal(json.cartItems);
        } else {
            console.error("Unexpected response structure:", json);
            setCartProducts([]);
        }
    };

    const calculateTotal = (cartItems) => {
        let total = 0;
        let quantity = 0;
        cartItems.forEach(item => {
            total += item.product.price * item.quantity;
            quantity += item.quantity;
        });
        setTotalPrice(total);
        setTotalQuantity(quantity);
    };

    const removeItemFromCart = async (cartItemId) => {
        try {
            const response = await fetch(`${host}/api/v1/product/removefromcart/${cartItemId}`, {
                method: "DELETE",
                headers: {
                    "auth-token": localStorage.getItem('token'),
                },
            });

            if (response.ok) {
                // window.confirm('Are you sure')
                setSuccess(true)
                const newCartProducts = cartProducts.filter(item => item._id !== cartItemId);
                setCartProducts(newCartProducts);
                calculateTotal(newCartProducts);
                // Hide alert after 3 seconds
                setTimeout(() => setSuccess(false), 3000);
                console.log("Item removed from cart successfully");
            } else {
                console.error("Failed to remove item from cart.");
            }
        } catch (error) {
            console.error("An error occurred while removing the item from the cart:", error);
        }
    };

    const updateQuantity = async (cartItemId, newQuantity) => {
        try {
            const response = await fetch(`${host}/api/v1/product/updatecartitem/${cartItemId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });

            if (response.ok) {
                const updatedCartProducts = cartProducts.map(item =>
                    item._id === cartItemId ? { ...item, quantity: newQuantity } : item
                );
                setCartProducts(updatedCartProducts);
                calculateTotal(updatedCartProducts);
                console.log("Quantity updated successfully");
            } else {
                console.error("Failed to update quantity.");
            }
        } catch (error) {
            console.error("An error occurred while updating the quantity:", error);
        }
    };

    useEffect(() => {
        getAllCartItems(); // Fetch cart items on component mount
    }, []);
    setPrice(totalPrice+deliveryCharges)
    return (
        <>
            {
                success && (
                    <Alert variant="filled" severity="success">
                        Product removed from cart Successfully !
                    </Alert>
                )
            }
            <h1 style={{ marginLeft: "5%", marginTop: '2%', marginBottom: '2%' }}>Cart</h1>

            <div className="d-flex mb-4">
                <div style={{ marginLeft: "5%", marginRight: '10%', height: '500px', width: '50%', overflowY: 'auto' }}>
                    <div className="card-group">
                        {cartProducts.map((item) => (
                            <div key={item._id} style={{ height: '400px', width: '317px', borderRadius: '24px' }} className="mr-4">
                                <img style={{ height: '210px', width: '100%', objectFit: 'cover', borderRadius: '23px' }} src={item.product.featuredImage} alt={item.product.productName} />
                                <div>
                                    <p className="mt-2 ml-2">{item.product.productName}</p>
                                    <div className="mt-2 ml-2">
                                        <Button onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</Button>
                                        Quantity - {item.quantity}
                                        <Button onClick={() => updateQuantity(item._id, item.quantity + 1)} disabled={item.quantity >= item.product.countOfStock}>+</Button>
                                    </div>
                                    <p className="mt-2 ml-2">Price - ₹{item.product.price * item.quantity}</p>
                                    {/* <Button className="mt-2 ml-2" variant="contained" onClick={() => removeItemFromCart(item._id)}>Remove</Button> */}
                                    <DialogueBox
                                        text="Remove"
                                        alert="Are you sure?"
                                        message="Once you click on agree it will remove forever!"
                                        onClickAgree={() => removeItemFromCart(item._id)} // Pass the function correctly
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ width: '28rem', height: '350px', border: '1px solid transparent', borderRadius: '12px', padding: '12px', boxShadow: ' 0px 5px 15px rgba(0, 0, 0, 0.35)' }}>
                    <div className="d-flex flex-column">
                        <div>
                            <p>Product Details</p>
                            <hr />
                            <p className="d-flex justify-content-between"><span>Price ({totalQuantity} items)</span><span>₹{totalPrice}</span></p>
                            <p className="d-flex justify-content-between"><span>Delivery Charges</span><span>₹{deliveryCharges}</span></p>
                            <hr />
                            <p className="d-flex justify-content-between"><span>Total Price</span><span>₹{totalPrice + deliveryCharges}</span></p>
                        </div>
                        <Link style={{ textDecoration: 'none' }} to="/order"><Button style={{ marginTop: '53px', width: '100%' }} variant="contained" title="Checkout">Place Order</Button></Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
