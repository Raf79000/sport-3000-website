import React from "react";
import "../styles/Cart.css";

var product1 = 10;
var product2 = 20;
var product3 = 30;
var total = product1 + product2 + product3;

const Cart = () => {
    return (
        <div className="Cart">
            <h2>Your Cart</h2>
            <ul className="Cart-list">
                <li className="Cart-item">
                    <span>Product 1</span>
                    <span>Price: ${product1}</span>
                </li>
                <li className="Cart-item">
                    <span>Product 2</span>
                    <span>Price: ${product2}</span>
                </li>
                <li className="Cart-item">
                    <span>Product 3</span>
                    <span>Price: ${product3}</span>
                </li>
            </ul>
            <div className="Cart-total">
                <span>Total: ${total}</span>
            </div>
            <button className="Cart-payment-button">Proceed to Payment</button>
        </div>
    );
};

export default Cart;