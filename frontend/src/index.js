import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./pages/App";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./contexts/CartContext";
import Preferences from "./pages/Preferences";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="*" element={<h1>Page not found</h1>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </CartProvider>
    </Router>
  </React.StrictMode>
);
