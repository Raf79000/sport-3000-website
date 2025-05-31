import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SalesDetail from "../components/SalesDetail";
import Cart from "../components/Cart";
import "../styles/App.css";

const Sales = () => {
  return (
    <div>
      <Header />
      <SalesDetail />
      <Cart />
      <Footer />
    </div>
  );
};

export default Sales;
