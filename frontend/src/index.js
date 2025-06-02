import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { PreferencesProvider } from "./contexts/PreferencesContext";
import { CartProvider } from "./contexts/CartContext";
import { CurrencySignProvider } from "./contexts/CurrencySignContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Preferences from "./pages/Preferences";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Sales from "./pages/Sales";
import Detail from "./pages/Detail";
import Orders from "./pages/Orders";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <PreferencesProvider>
        <CartProvider>
            <CurrencySignProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<h1>Page not found</h1>} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/detail/:itemId" element={<Detail />} />
                <Route path="/preferences" element={<Preferences />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </CurrencySignProvider>
        </CartProvider>
      </PreferencesProvider>
    </Router>
  </React.StrictMode>
);
