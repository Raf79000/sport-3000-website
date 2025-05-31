// Filename - pages/About.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutDetail from "../components/AboutDetail";
import "../styles/App.css";

const About = () => {
  return (
    <div>
      <Header />
      <main>
        <AboutDetail />
      </main>
      <Footer />
    </div>
  );
};

export default About;
