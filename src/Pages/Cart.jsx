import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import DialogueBox from "../Components/DialogueBox";
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import productContext from '../context/products/productContext';

function Cart() {
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [success, setSuccess] = useState(false);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const navigate = useNavigate();

    const context = useContext(productContext);  
    const { host, setPrice } = context;

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

    const calculateDiscount = (price) => {
        if (price > 5000) return 20;
        if (price > 2000) return 15;
        if (price > 1000) return 10;
        if (price > 500) return 5;
        return 0;
    };

    const calculateTotal = (cartItems) => {
        let total = 0;
        let quantity = 0;
        let discountTotal = 0;

        cartItems.forEach(item => {
            const itemTotalPrice = item.product.price * item.quantity;
            const discountPercent = calculateDiscount(item.product.price);
            const discountAmount = (itemTotalPrice * discountPercent) / 100;
            const discountedPrice = itemTotalPrice - discountAmount;

            total += discountedPrice;
            quantity += item.quantity;
            discountTotal += discountAmount * item.quantity; // Total discount for the item
        });

        setTotalPrice(total);
        setTotalQuantity(quantity);
        setTotalDiscount(discountTotal);
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
                setSuccess(true)
                const newCartProducts = cartProducts.filter(item => item._id !== cartItemId);
                setCartProducts(newCartProducts);
                calculateTotal(newCartProducts);
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

    setPrice(totalPrice + deliveryCharges);

    if (!localStorage.getItem('token')) {
        navigate("/login");
    }

    return (
        <>
            {
                success && (
                    <Alert variant="filled" severity="success">
                        Product removed from cart Successfully!
                    </Alert>
                )
            }
            <h1 style={{ marginLeft: "5%", marginTop: '2%', marginBottom: '2%' }}>Cart</h1>

            <div className="mobile-cart d-flex mb-4">
                <div className="mobile-cart-sec-1" style={{ marginLeft: "5%", width: '50%', marginRight: '10%', height: '500px', overflowY: 'auto' }}>
                    <div className="card-group">
                        {cartProducts.map((item) => {
                            const itemTotalPrice = item.product.price * item.quantity;
                            const discountPercent = calculateDiscount(item.product.price);
                            const discountAmount = (itemTotalPrice * discountPercent) / 100;
                            const discountedPrice = itemTotalPrice - discountAmount;

                            return (
                                <div key={item._id} style={{ height: '400px', width: '317px', borderRadius: '24px' }} className="mr-4">
                                    <img style={{ height: '210px', width: '100%', objectFit: 'cover', borderRadius: '23px' }} src={item.product.featuredImage} alt={item.product.productName} />
                                    <div>
                                        <p className="mt-2 ml-2">{item.product.productName}</p>
                                        <div className="mt-2 ml-2">
                                            <Button onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</Button>
                                            Quantity - {item.quantity}
                                            <Button onClick={() => updateQuantity(item._id, item.quantity + 1)} disabled={item.quantity >= item.product.countOfStock}>+</Button>
                                        </div>
                                        <p className="mt-2 ml-2"><strong>Price -</strong> <del>₹{itemTotalPrice}</del> - <span className="text-success">₹{discountedPrice}</span> <span className="bg-success text-light px-2 ml-2" style={{borderRadius:'12px'}}>{discountPercent}% off</span></p>
                                        <DialogueBox
                                            varient="outlined"
                                            text="Remove"
                                            alert="Are you sure?"
                                            message="Once you click on agree it will remove forever!"
                                            onClickAgree={() => removeItemFromCart(item._id)}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div style={{ width: '25rem', height: '350px', border: '1px solid transparent', borderRadius: '12px', padding: '12px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.35)' }}>
                    <div className="d-flex flex-column">
                        <div>
                            <p>Product Details</p>
                            <hr />
                            <p className="d-flex justify-content-between"><span>Price ({totalQuantity} items)</span><span>₹{Math.ceil(totalPrice)}</span></p>
                            <p className="d-flex justify-content-between"><span>Delivery Charges</span><span>₹{deliveryCharges}</span></p>
                            <p className="d-flex justify-content-between"><span>Total Discount</span><span className="text-success">-₹{Math.ceil(totalDiscount)}</span></p>
                            <hr />
                            <p className="d-flex justify-content-between"><span>Total Price</span><span>₹{Math.ceil(totalPrice + deliveryCharges)}</span></p>
                        </div>
                        <Link style={{ textDecoration: 'none' }} to="/order"><Button style={{ marginTop: '53px', width: '100%' }} variant="contained" title="Checkout">Place Order</Button></Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
