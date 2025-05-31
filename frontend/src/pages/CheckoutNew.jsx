import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../utils/auth";
import { useCart } from "../contexts/CartContext";
import { createOrder, createOrderItems } from "../api/orderApi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/App.css";

const CheckoutNew = () => {
  const { cart, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  if (!getToken()) {
    return (
      <div>
        <Header />
        <main>
          <div>
            <h2>Please log in to proceed with checkout</h2>
            <Link to="/login">Log In</Link>
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

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCheckout = async (e) => {
    // Simulate checkout process
    e.preventDefault();

    try {
      const response = await createOrder({
        customerId: localStorage.getItem("userId"),
        totalAmount: totalPrise,
        paymentMethod: "Credit Card", // This can be dynamic based on user input
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
      <div>
        <Header />
        <main>
          <div>
            <h2>Thank you for your order!</h2>
            <p>Your order has been confirmed.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        <div>
          {/* step 1: go to checkout */}
          {currentStep === 1 && (
            <div>
              <h2>Review Your Cart</h2>
              {cart.length > 0 ? (
                <div>
                  {cart.map((item, index) => (
                    <div key={index}>
                      <div>
                        <div>
                          {item.cover ? (
                            <img
                              src={item.cover}
                              alt={item.name}
                              onError={(e) => {
                                e.target.onerror = null;
                                console.log("Image failed to load");
                                e.target.style.display = "none";
                              }}
                            />
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3>{item.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                        {item.onSale ? (
                          <p>
                            ${(item.salesPrice * item.quantity).toFixed(2)}
                          </p>
                        ) : (
                          <p>
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  <div>
                    <Link to="/">
                      <button>Back to Shop</button>
                    </Link>
                    <button className="primary-btn" onClick={handleCheckout}>
                      Checkout
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    Your cart is empty! Add some products before checking out.
                  </p>
                  <Link to="/">
                    <button>Back to Shop</button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutNew;
