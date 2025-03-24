import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import "../styles/Checkout.css";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping info
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "France",
    // Payment info
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [orderComplete, setOrderComplete] = useState(false);

  // Calculate total price
  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);
  const shippingCost = cart.length > 0 ? 4.99 : 0;
  const finalTotal = (parseFloat(totalPrice) + shippingCost).toFixed(2);

  const checkForRequired = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.zipCode
    ) {
      alert("Please fill out all required shipping fields.");
      return;
    }
    handleNext();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", {
      formData,
      items: cart,
      total: finalTotal,
    });
    // Here you would typically send the order to your backend
    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="checkout-container">
        <div className="order-confirmation">
          <div className="confirmation-icon">✓</div>
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase, {formData.firstName}!</p>
          <p>Your order has been received and is now being processed.</p>
          <p>
            A confirmation email has been sent to{" "}
            <strong>{formData.email}</strong>
          </p>
          <div className="order-number">
            <p>
              Order number:{" "}
              <strong>{Math.floor(Math.random() * 10000000)}</strong>
            </p>
          </div>
          <button
            className="primary-btn"
            onClick={() => (window.location.href = "/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-progress">
        <div className={`progress-step ${currentStep >= 1 ? "active" : ""}`}>
          <div className="step-number">1</div>
          <span>Cart Review</span>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${currentStep >= 2 ? "active" : ""}`}>
          <div className="step-number">2</div>
          <span>Shipping</span>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${currentStep >= 3 ? "active" : ""}`}>
          <div className="step-number">3</div>
          <span>Payment</span>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-left">
          {/* Step 1: Review Cart */}
          {currentStep === 1 && (
            <div className="checkout-step">
              <h2>Review Your Cart</h2>
              {cart.length > 0 ? (
                <div className="checkout-cart">
                  {cart.map((item, index) => (
                    <div key={index} className="checkout-item">
                      <div className="checkout-item-image">
                        <div className="placeholder-image">
                          {item.img ? (
                            <img
                              src={item.img}
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
                        <p className="item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="checkout-actions">
                    <button
                      className="secondary-btn"
                      onClick={() => (window.location.href = "/")}
                    >
                      Back to Shop
                    </button>
                    <button className="primary-btn" onClick={handleNext}>
                      Continue to Shipping
                    </button>
                  </div>
                </div>
              ) : (
                <div className="empty-cart">
                  <p>
                    Your cart is empty! Add some products before checking out.
                  </p>
                  <button
                    className="primary-btn"
                    onClick={() => (window.location.href = "/")}
                  >
                    Back to Shop
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Shipping Information */}
          {currentStep === 2 && (
            <div className="checkout-step">
              <h2>Shipping Information</h2>
              <form className="checkout-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">Postal Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Spain">Spain</option>
                    <option value="Italy">Italy</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
              </form>
              <div className="checkout-actions">
                <button className="secondary-btn" onClick={handlePrev}>
                  Back to Cart
                </button>
                <style>
                  {
                    ".checkout-actions > button.primary-btn:last-child { display: none; }"
                  }
                </style>
                <button className="primary-btn" onClick={checkForRequired}>
                  Continue to Payment
                </button>
                <button className="primary-btn" onClick={handleNext}>
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment Information */}
          {currentStep === 3 && (
            <div className="checkout-step">
              <h2>Payment Method</h2>
              <form className="checkout-form" onSubmit={handleSubmit}>
                <div className="payment-methods">
                  <div className="payment-method active">
                    <input
                      type="radio"
                      id="credit-card"
                      name="payment"
                      defaultChecked
                    />
                    <label htmlFor="credit-card">Credit Card</label>
                  </div>
                  <div className="payment-method">
                    <input type="radio" id="paypal" name="payment" />
                    <label htmlFor="paypal">PayPal</label>
                  </div>
                </div>

                <div className="credit-card-form">
                  <div className="form-group">
                    <label htmlFor="cardName">Name on Card</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="XXXX XXXX XXXX XXXX"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">Security Code</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="checkout-actions">
                  <button className="secondary-btn" onClick={handlePrev}>
                    Back to Shipping
                  </button>
                  <button type="submit" className="primary-btn">
                    Complete Order
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="checkout-right">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cart.map((item, index) => (
                <div key={index} className="summary-item">
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-subtotal">
              <span>Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <div className="summary-shipping">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${finalTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
