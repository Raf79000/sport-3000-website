import React from "react";
import { Link } from "react-router-dom";
import "../styles/Cart.css";
import { useCart } from "../contexts/CartContext";

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  // Calculate total price
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
    <div className="cart-summary">
      <h3>Shopping Cart</h3>
      {cart.length > 0 ? (
        <>
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-info">
                  <span>{item.name}</span>
                  {item.onSale ? (
                    <span className="cart-item-price">
                      ${item.salesPrice.toFixed(2)}
                    </span>
                  ) : (
                    <span className="cart-item-price">
                      ${item.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => removeFromCart(index)}
                    >
                      -
                    </button>
                    <span className="item-quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>
                  {item.onSale ? (
                    <span className="item-total">
                      ${(item.salesPrice * item.quantity).toFixed(2)}
                    </span>
                  ) : (
                    <span className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">Total: ${totalPrice}</div>
          <Link to="/checkout" className="checkout-btn">
            <button>Checkout</button>
          </Link>
        </>
      ) : (
        <p className="empty-cart-message">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
