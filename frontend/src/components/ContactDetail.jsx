import "../styles/Contact.css";
import React, { useState } from "react";

const ContactDetail = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the form data to your backend
    alert("Message sent! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <div className="retro-line"></div>
        <p className="contact-intro">
          Have questions about our products or services? We're here to help!
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-form-container">
          <h2>Send us a message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-info">
          <div className="info-card">
            <h2>Get in Touch</h2>
            <div className="info-item">
              <div className="info-icon location-icon"></div>
              <div>
                <h3>Address</h3>
                <p>
                  123 Sporty Avenue
                  <br />
                  Paris, France 75001
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon email-icon"></div>
              <div>
                <h3>Email</h3>
                <p>
                  info@sport3000.com
                  <br />
                  support@sport3000.com
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon phone-icon"></div>
              <div>
                <h3>Phone</h3>
                <p>
                  +33 1 23 45 67 89
                  <br />
                  Monday-Friday: 9am-6pm
                </p>
              </div>
            </div>

            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  FB
                </a>
                <a href="#" className="social-icon">
                  IG
                </a>
                <a href="#" className="social-icon">
                  TW
                </a>
                <a href="#" className="social-icon">
                  YT
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
