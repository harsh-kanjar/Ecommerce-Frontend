import { ShoppingBag } from "@mui/icons-material";
import { Button } from "@mui/material";
import {useEffect} from "react";
function ImageGallery(props) {
    //  fetch all products
    useEffect(() => {
        props.getAllProduct();
    }, []);
    return (
        <div style={{marginLeft:'5%'}}>
            <div className="card-group">
                {
                    props.products.map((products) => {
                        return (
                            <span key={products._id}>
                                <div className="card m-2" style={{ width: '20rem' }} >
                                    <img style={{ objectFit: 'cover', height: '210px', width: '100%' }} src={products.featuredImage} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{products.featuredImage}</h5>
                                        {/* <p className="card-text"> {products.description.length > 50 ? `${products.description.slice(0, 35)}...` : products.description} </p> */}
                                    </div>
                                    {/* <ul className="list-group list-group-flush">
                                        <li className="list-group-item">{products.brand}</li>
                                        <li className="list-group-item">Hurry up only - {products.countOfStock} left</li>
                                        <li className="list-group-item">⭐⭐⭐⭐⭐ {products.rating}</li>
                                    </ul>
                                    <div className="card-body">
                                    <Button variant="contained" className="mx-2">Buy Now</Button>
                                    <Button variant="outlined"><ShoppingBag/></Button>
                                    </div> */}
                                </div>
                            </span>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ImageGallery;
