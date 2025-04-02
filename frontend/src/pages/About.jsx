// Filename - pages/About.js

import React from "react";
import "../styles/About.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div>
      <Header />
      <div className="about-container">
        <div className="about-header">
          <h1>About Sport 3000</h1>
          <div className="retro-line"></div>
        </div>

        <section className="about-section mission">
          <h2>Our Mission</h2>
          <div className="grid-container">
            <div className="grid-text">
              <p>
                Founded in 2023, Sport 3000 is on a mission to revolutionize
                athletic gear with a touch of retro flair. We believe sports
                equipment should not only perform exceptionally but also embody
                the vibrant energy that makes sports exciting.
              </p>
              <p>
                Our products combine cutting-edge technology with designs
                inspired by the bold aesthetics of the 80s and 90s – an era when
                sports culture truly exploded into the mainstream.
              </p>
            </div>
            <div className="grid-image mission-image">
              <div className="retro-shape"></div>
            </div>
          </div>
        </section>

        <section className="about-section values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon quality"></div>
              <h3>Quality</h3>
              <p>
                Every product undergoes rigorous testing to ensure it meets the
                demands of dedicated athletes.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon innovation"></div>
              <h3>Innovation</h3>
              <p>
                We continuously explore new technologies to enhance performance
                and comfort.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon sustainability"></div>
              <h3>Sustainability</h3>
              <p>
                Committed to reducing our environmental impact through
                eco-friendly materials and processes.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section team">
          <h2>Our Team</h2>
          <p className="team-intro">
            Sport 3000 is powered by a diverse team of athletes, designers, and
            tech enthusiasts who share a passion for sports and retro culture.
          </p>

          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>Alex Durand</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>Sophie Martin</h3>
              <p>Lead Designer</p>
            </div>
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>Marcus Chen</h3>
              <p>Product Development</p>
            </div>
          </div>
        </section>

        <section className="about-section visit">
          <h2>Visit Us</h2>
          <div className="location-container">
            <div className="location-info">
              <p>
                <strong>Headquarters:</strong>
                <br />
                123 Sporty Avenue
                <br />
                Paris, France 75001
              </p>
              <p>
                <strong>Showroom Hours:</strong>
                <br />
                Monday-Friday: 10am-7pm
                <br />
                Saturday: 11am-5pm
                <br />
                Sunday: Closed
              </p>
            </div>
            <div className="location-map">
              <div className="map-placeholder">
                <span>MAP</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
