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
    <div>
      <header>
        <h3>Shopping Cart</h3>
      </header>
      <main>
        {cart.length > 0 ? (
          <>
            <ul>
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-sm border-b border-gray-700"
                >
                  <div>
                    <span>{item.name}</span>
                    <span>
                      {item.onSale
                        ? `$${item.salesPrice.toFixed(2)}`
                        : `$${item.price.toFixed(2)}`}
                    </span>
                  </div>
                  <div>
                    <button
                      className="btn btn-secondary"
                      onClick={() => removeFromCart(index)}
                    >
                      –
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-secondary"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                    <span>
                      {item.onSale
                        ? `$${(item.salesPrice * item.quantity).toFixed(2)}`
                        : `$${(item.price * item.quantity).toFixed(2)}`}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div>Total: ${totalPrice}</div>
            <Link to="/checkout">
              <button>Checkout</button>
            </Link>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
      </main>
    </div>
  );
};

export default Cart;
