import React, { useState } from "react";
import "../styles/Contact.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ContactDetail from "../components/ContactDetail";

const Contact = () => {

  // eslint-disable-next-line
  return (
    <div>
      <Header />
      <ContactDetail />
      <Footer />
    </div>
  );
};

export default Contact;
