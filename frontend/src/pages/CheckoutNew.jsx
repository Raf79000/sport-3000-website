import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../utils/auth";
import { useCart } from "../contexts/CartContext";
import { createOrder } from "../api/orderApi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Checkout.css";

const CheckoutNew = () => {
  const { cart, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  if (!getToken()) {
    return (
      <div>
        <h2>Please log in to proceed with checkout</h2>
        <Link to="/login">Log In</Link>
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

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCheckout = (e) => {
    // Simulate checkout process
    e.preventDefault();

    createOrder({
      customerId: localStorage.getItem("userId"),
      totalAmount: totalPrise,
      paymentMethod: "Credit Card", // This can be dynamic based on user input
    })
      .then((response) => {        
        if (!response.id) {
          alert("Checkout failed. Please try again.");
        } else {
          alert("Checkout successful!");
          clearCart();
          setIsOrderConfirmed(true);
        }
      })
      .catch((err) => {
        console.error("Order creation threw an error:", err);
        alert("Checkout failed due to a network or server error.");
      });
  };

  if (isOrderConfirmed) {
    return (
      <div>
        <Header />
        <div className="checkout-confirmation">
          <h2>Thank you for your order!</h2>
          <p>Your order has been confirmed.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="checkout-container">
        {/* step 1: go to checkout */}
        {currentStep === 1 && (
          <div className="checkout-step">
            <h2>Review Your Cart</h2>
            {cart.length > 0 ? (
              <div className="checkout-cart">
                {cart.map((item, index) => (
                  <div key={index} className="checkout-item">
                    <div className="checkout-item-image">
                      <div className="placeholder-image">
                        {item.cover ? (
                          <img
                            src={item.cover}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              console.log("Image failed to load");
                              // Fallback to a default icon or hide the image
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          // Fallback display when no image is available
                          <div className="no-image-icon"></div>
                        )}
                      </div>
                    </div>
                    <div className="checkout-item-details">
                      <h3>{item.name}</h3>
                      <p>Quantity: {item.quantity}</p>
                      {item.onSale ? (
                        <p className="item-price">
                          ${(item.salesPrice * item.quantity).toFixed(2)}
                        </p>
                      ) : (
                        <p className="item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="checkout-actions">
                  <Link to="/">
                    <button className="secondary-btn">Back to Shop</button>
                  </Link>
                  <button className="primary-btn" onClick={handleCheckout}>
                    Checkout
                  </button>
                </div>
              </div>
            ) : (
              <div className="empty-cart">
                <p>
                  Your cart is empty! Add some products before checking out.
                </p>
                <Link to="/">
                  <button className="primary-btn">Back to Shop</button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutNew;
