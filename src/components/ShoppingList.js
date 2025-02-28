import React, { useState } from 'react';
import Item from './Item';
import merchs from '../datas/merchs.json';
import '../styles/ShoppingList.css';

function ShoppingList() {
    const [cart, setCart] = useState([]);
    
    const addToCart = (item) => {
        setCart([...cart, item]);
        console.log(`Added ${item.name} to cart`);
    };
    
    return (
        <div className="shopping-list">
            <h2 className="shopping-list-title">Sport 3000 Products</h2>
            
            <div className="items-container">
                {merchs.map(item => (
                    <Item 
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        imageUrl={item.img}
                        description={item.description || "Premium sports equipment for athletes."}
                        onAddToCart={() => addToCart(item)}
                    />
                ))}
            </div>
            
            <div className="cart-summary">
                <h3>Shopping Cart</h3>
                {cart.length > 0 ? (
                    <>
                        <ul className="cart-list">
                            {cart.map((item, index) => (
                                <li key={index} className="cart-item">
                                    <span>{item.name}</span>
                                    <span>${item.price.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-total">
                            Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                        </div>
                        <button className="checkout-btn">Checkout</button>
                    </>
                ) : (
                    <p className="empty-cart-message">Your cart is empty</p>
                )}
            </div>
        </div>
    );
}

export default ShoppingList;