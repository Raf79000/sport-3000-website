// Cart.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "../styles/App.css";

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const totalPrice = cart
    .reduce(
      (sum, item) =>
        sum +
        (item.onSale
          ? item.salesPrice * item.quantity
          : item.price * item.quantity),
      0
    )
    .toFixed(2);

  return (
    <div id="cart-container" className="cart-container">
      <header id="cart-header" className="cart-header">
        <h3 className="cart-title">Shopping Cart</h3>
      </header>
      <main id="cart-main" className="cart-main">
        {cart.length > 0 ? (
          <>
            <ul className="cart-list">
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <div className="cart-item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">
                      {item.onSale
                        ? `$${item.salesPrice.toFixed(2)}`
                        : `$${item.price.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="cart-item-actions">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => removeFromCart(index)}
                      aria-label="Decrease quantity"
                    >
                      –
                    </button>
                    <span className="item-quantity">{item.quantity}</span>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => addToCart(item)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <span className="item-subtotal">
                      {item.onSale
                        ? `$${(item.salesPrice * item.quantity).toFixed(2)}`
                        : `$${(item.price * item.quantity).toFixed(2)}`}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-total">Total: ${totalPrice}</div>
            <Link to="/checkout" className="checkout-link">
              <button className="btn btn-primary checkout-btn">
                Checkout
              </button>
            </Link>
          </>
        ) : (
          <p className="cart-empty">Your cart is empty</p>
        )}
      </main>
    </div>
  );
};

export default Cart;
