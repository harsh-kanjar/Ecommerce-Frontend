import productContext from "./productContext";
import { useState } from "react";

function ProductsState(props) {
    const host = "http://localhost:5000";
    const productsInitial = [];
    const cartInitial = [];
    const [price,setPrice] = useState(0);
    // Fetch all products using fetch api
    const getAllProduct = async () => {
        // Api call
        const response = await fetch(`${host}/api/v1/product/getallproducts`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        });
        const json = await response.json();
        console.log(json);
        setProducts(json);
        // ------------------------------------
    };

    // Fetch cart
    const getAllCartItems = async () => {
        // Api call
        const response = await fetch(`${host}/api/v1/product/getcartproducts`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        });
        const json = await response.json();
        console.log(json);
        setProducts(json);
        // ------------------------------------
    };

     // Function to add product via API
     const addProduct = async (productData) => {
        try {
            const response = await fetch(`${host}/api/v1/product/addproduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server responded with:", errorText);
                throw new Error(`Server error: ${response.status} - ${response.statusText}`);
            }

            const product = await response.json();
            setProducts(products.concat(product));
            console.log("Product added successfully:", product);
        } catch (error) {
            console.error("An error occurred while adding the product:", error);
        }
    };


    
    const [products, setProducts] = useState(productsInitial);
    const [cartProducts, setCartProducts] = useState(productsInitial);

    return (
        <noteContext.Provider
            value={{ host,products, getAllProduct, addProduct, setPrice, price }}
        >
            {props.children}
        </noteContext.Provider>
    );
}
export default ProductsState
