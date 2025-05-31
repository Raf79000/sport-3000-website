import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminDetail from "../components/AdminDetail";
import OrderCRUD from "../components/OrderCRUD";
import "../styles/App.css";

export default function Admin() {
  return (
    <div>
      <Header />
      <main>
        <AdminDetail />
        <OrderCRUD />
      </main>
      <Footer />
    </div>
  );
}
