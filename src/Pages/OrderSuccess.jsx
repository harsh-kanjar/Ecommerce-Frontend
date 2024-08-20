import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className='container my-4'>
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4 mx-4">Order Successfully Placed!</h1>
                    <p class="lead mb-2 mx-4">Thank you for your purchase. You can view your orders or continue shopping.</p>
                    <Button variant='outlined' className='m-4'><Link to="/myorders" style={{textDecoration:'none'}}>View My Orders</Link></Button>
                    <Button variant='outlined'><Link to="/" style={{textDecoration:'none'}}>Continue Shopping</Link></Button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
