// Checkout.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../utils/auth";
import { useCart } from "../contexts/CartContext";
import { createOrder, createOrderItems } from "../api/orderApi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/App.css";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  if (!getToken()) {
    return (
      <div id="checkout-container" className="checkout-container">
        <Header />
        <main id="checkout-main" className="checkout-main">
          <div className="checkout-message">
            <h2>Please log in to proceed with checkout</h2>
            <Link to="/login" className="btn btn-primary mt-md">
              Log In
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalPrise = cart
    .reduce(
      (sum, item) =>
        sum +
        (item.onSale
          ? item.salesPrice * item.quantity
          : item.price * item.quantity),
      0
    )
    .toFixed(2);

  const handleCheckout = async (e) => {
    e.preventDefault();

    try {
      const response = await createOrder({
        customerId: localStorage.getItem("userId"),
        totalAmount: totalPrise,
        paymentMethod: "Credit Card",
      });

      if (!response.id) {
        alert("Checkout failed. Please try again.");
        throw new Error("Checkout failed.");
      }

      const orderItemPromises = cart.map((item) => {
        return createOrderItems(response.id, item.id, {
          quantity: item.quantity,
          price: item.onSale ? item.salesPrice : item.price,
        });
      });

      await Promise.all(orderItemPromises);

      clearCart();
      setIsOrderConfirmed(true);
    } catch (err) {
      console.error("Error during checkout:", err);
      alert("Checkout failed due to a network or server error.");
    }
  };

  if (isOrderConfirmed) {
    return (
      <div id="checkout-container" className="checkout-container">
        <Header />
        <main id="checkout-main" className="checkout-main">
          <div className="checkout-message">
            <h2>Thank you for your order!</h2>
            <p>Your order has been confirmed.</p>
            <Link to="/" className="btn btn-primary mt-md">
              Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div id="checkout-container" className="checkout-container">
      <Header />
      <main id="checkout-main" className="checkout-main">
        {currentStep === 1 && (
          <div className="checkout-step">
            <h2 className="checkout-heading">Review Your Cart</h2>
            {cart.length > 0 ? (
              <>
                <div className="checkout-items-list">
                  {cart.map((item, index) => (
                    <div key={index} className="checkout-item">
                      <div className="checkout-item-image">
                        {item.cover ? (
                          <img
                            src={item.cover}
                            alt={item.name}
                            className="checkout-img cursor-pointer"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="checkout-img-placeholder"></div>
                        )}
                      </div>
                      <div className="checkout-item-details">
                        <h3 className="item-name">{item.name}</h3>
                        <p className="item-quantity">Quantity: {item.quantity}</p>
                        <p className="item-subtotal">
                          {item.onSale ? (
                            `$${(item.salesPrice * item.quantity).toFixed(2)}`
                          ) : (
                            `$${(item.price * item.quantity).toFixed(2)}`
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="checkout-summary">
                  <p className="summary-text">
                    Total: <span className="summary-amount">${totalPrise}</span>
                  </p>
                  <div className="checkout-actions">
                    <Link to="/" className="btn btn-secondary">
                      Back to Shop
                    </Link>
                    <button
                      className="btn btn-primary"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="checkout-empty">
                <p>Your cart is empty! Add some products before checking out.</p>
                <Link to="/" className="btn btn-primary mt-md">
                  Back to Shop
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
