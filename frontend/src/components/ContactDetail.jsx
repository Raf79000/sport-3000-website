// ContactDetail.jsx
import React, { useState } from "react";
import "../styles/App.css";

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
    alert("Message sent! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div >
      <header >
        <h1>Contact Us</h1>
      </header>
      <main >
        <div >
          <div >
            <h2>Send us a message</h2>
            <form  onSubmit={handleSubmit}>
              <div >
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
              <div >
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
              <div >
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
              <div >
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
              <button type="submit" >
                Send Message
              </button>
            </form>
          </div>

          <div >
            <div >
              <h2>Get in Touch</h2>
              <div >
                <div ></div>
                <div>
                  <h3>Address</h3>
                  <p>
                    4 rue de la Force
                    <br />
                    Gondrin, France 32330
                  </p>
                </div>
              </div>

              <div >
                <div ></div>
                <div>
                  <h3>Email</h3>
                  <p>
                    info@sport3000.com
                    <br />
                    support@sport3000.com
                  </p>
                </div>
              </div>

              <div >
                <div ></div>
                <div>
                  <h3>Phone</h3>
                  <p>
                    +33 1 23 45 67 89
                    <br />
                    Monday-Friday: 9am-6pm
                  </p>
                </div>
              </div>

              <div >
                <h3>Follow Us</h3>
                <div >
                  <a href="#" >
                    FB
                  </a>
                  <a href="#" >
                    IG
                  </a>
                  <a href="#" >
                    TW
                  </a>
                  <a href="#" >
                    YT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactDetail;
