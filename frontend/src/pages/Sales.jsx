import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SalesDetail from "../components/SalesDetail";
import "../styles/App.css";

const Sales = () => {
  return (
    <div>
      <Header />
      <main>
        <SalesDetail />
      </main>
      <Footer />
    </div>
  );
};

export default Sales;
