import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/App.css"

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
      <div>
        <Header />
        <div>
          <div>
            <div>✓</div>
            <h2>Order Confirmed!</h2>
            <p>Thank you for your purchase, {formData.firstName}!</p>
            <p>Your order has been received and is now being processed.</p>
            <p>
              A confirmation email has been sent to{" "}
              <strong>{formData.email}</strong>
            </p>
            <div>
              <p>
                Order number:{" "}
                <strong>{Math.floor(Math.random() * 10000000)}</strong>
              </p>
            </div>
            <Link to="/">
              <button type="button">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div>
        <h1>Checkout</h1>
        <div>
          <div className={`progress-step ${currentStep >= 1 ? "active" : ""}`}>
            <div>1</div>
            <span>Cart Review</span>
          </div>
          <div></div>
          <div className={`progress-step ${currentStep >= 2 ? "active" : ""}`}>
            <div>2</div>
            <span>Shipping</span>
          </div>
          <div></div>
          <div className={`progress-step ${currentStep >= 3 ? "active" : ""}`}>
            <div>3</div>
            <span>Payment</span>
          </div>
        </div>

        <div>
          <div>
            {/* Step 1: Review Cart */}
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
                                  // Fallback to a default icon or hide the image
                                  e.target.style.display = "none";
                                }}
                              />
                            ) : (
                              // Fallback display when no image is available
                              <div></div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h3>{item.name}</h3>
                          <p>Quantity: {item.quantity}</p>
                          <p>
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div>
                      <Link to="/">
                        <button>Back to Shop</button>
                      </Link>
                      <button className="primary-btn" onClick={handleNext}>
                        Continue to Shipping
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

            {/* Step 2: Shipping Information */}
            {currentStep === 2 && (
              <div>
                <h2>Shipping Information</h2>
                <form>
                  <div>
                    <div>
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
                    <div>
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
                  <div>
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
                  <div>
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
                  <div>
                    <div>
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
                    <div>
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
                  <div>
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
                <div>
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
              <div>
                <h2>Payment Method</h2>
                <form className="checkout-form" onSubmit={handleSubmit}>
                  <div>
                    <div>
                      <input
                        type="radio"
                        id="credit-card"
                        name="payment"
                        defaultChecked
                      />
                      <label htmlFor="credit-card">Credit Card</label>
                    </div>
                    <div>
                      <input type="radio" id="paypal" name="payment" />
                      <label htmlFor="paypal">PayPal</label>
                    </div>
                  </div>

                  <div>
                    <div>
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
                    <div>
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
                    <div>
                      <div>
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
                      <div>
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

                  <div>
                    <button className="secondary-btn" onClick={handlePrev}>
                      Back to Shipping
                    </button>
                    <button type="submit">
                      Complete Order
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div>
            <div>
              <h3>Order Summary</h3>
              <div>
                {cart.map((item, index) => (
                  <div key={index}>
                    <span>
                      {item.quantity} × {item.name}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div>
                <span>Subtotal</span>
                <span>${totalPrice}</span>
              </div>
              <div>
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div>
                <span>Total</span>
                <span>${finalTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
