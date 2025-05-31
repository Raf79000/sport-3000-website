// Filename - pages/About.js

import React from "react";
import "../styles/About.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutDetail from "../components/AboutDetail";

const About = () => {
  return (
    <div>
      <Header />
      <AboutDetail />
      <Footer />
    </div>
  );
};

export default About;
