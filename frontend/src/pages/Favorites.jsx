import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FavoritesDetail from "../components/FavoritesDetail";
import Cart from "../components/Cart";
import "../styles/App.css";

const Favorites = () => {
  return (
    <div>
      <Header />
      <main>
        <FavoritesDetail />
      </main>
      <Cart />
      <Footer />
    </div>
  );
};

export default Favorites;
