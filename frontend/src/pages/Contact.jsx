import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ContactDetail from "../components/ContactDetail";
import "../styles/App.css";

const Contact = () => {
  // eslint-disable-next-line
  return (
    <div>
      <Header />
      <main>
        <ContactDetail />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
