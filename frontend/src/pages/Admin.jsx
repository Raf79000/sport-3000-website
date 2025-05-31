import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminDetail from "../components/AdminDetail";
import "../styles/App.css";

export default function Admin() {
  return (
    <div>
      <Header />
      <AdminDetail />
      <Footer />
    </div>
  );
}
