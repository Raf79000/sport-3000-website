import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeDetail from "../components/HomeDetail";

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <HomeDetail />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
