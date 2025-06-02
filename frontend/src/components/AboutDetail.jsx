// AboutDetail.jsx
import React from "react";
import "../styles/App.css";

const AboutDetail = () => {
  return (
    <div id="about-container" className="about-container">
      <header id="about-header" className="about-header">
        <h1 className="about-title">About Sport 3000</h1>
        <div className="about-header-divider"></div>
      </header>

      <section id="mission-section" className="about-section">
        <h2 className="about-section-title">Our Mission</h2>
        <div className="about-section-content">
          <div className="about-text-block">
            <p>
              Founded in 2023, Sport 3000 is on a mission to revolutionize
              athletic gear with a touch of retro flair. We believe sports
              equipment should not only perform exceptionally but also embody
              the vibrant energy that makes sports exciting.
            </p>
            <p>
              Our products combine cutting-edge technology with designs inspired
              by the bold aesthetics of the 80s and 90s – an era when sports
              culture truly exploded into the mainstream.
            </p>
          </div>
          <div className="about-image-block">
            <div className="about-mission-image"></div>
          </div>
        </div>
      </section>

      <section id="values-section" className="about-section">
        <h2 className="about-section-title">Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon value-icon-quality"></div>
            <h3 className="value-title">Quality</h3>
            <p className="value-text">
              Every product undergoes rigorous testing to ensure it meets the
              demands of dedicated athletes.
            </p>
          </div>
          <div className="value-card">
            <div className="value-icon value-icon-innovation"></div>
            <h3 className="value-title">Innovation</h3>
            <p className="value-text">
              We continuously explore new technologies to enhance performance
              and comfort.
            </p>
          </div>
          <div className="value-card">
            <div className="value-icon value-icon-sustainability"></div>
            <h3 className="value-title">Sustainability</h3>
            <p className="value-text">
              Committed to reducing our environmental impact through
              eco-friendly materials and processes.
            </p>
          </div>
        </div>
      </section>

      <section id="team-section" className="about-section">
        <h2 className="about-section-title">Our Team</h2>
        <p className="team-intro">
          Sport 3000 is powered by a diverse team of athletes, designers, and
          tech enthusiasts who share a passion for sports and retro culture.
        </p>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-photo team-photo-alex"></div>
            <h3 className="team-name">Alex Durand</h3>
            <p className="team-role">Founder &amp; CEO</p>
          </div>
          <div className="team-card">
            <div className="team-photo team-photo-sophie"></div>
            <h3 className="team-name">Sophie Martin</h3>
            <p className="team-role">Lead Designer</p>
          </div>
          <div className="team-card">
            <div className="team-photo team-photo-marcus"></div>
            <h3 className="team-name">Marcus Chen</h3>
            <p className="team-role">Product Development</p>
          </div>
        </div>
      </section>

      <section id="visit-section" className="about-section">
        <h2 className="about-section-title">Visit Us</h2>
        <div className="visit-content">
          <div className="visit-details">
            <p>
              <strong>Headquarters:</strong>
              <br />
              4 rue de la Force
              <br />
              Gondrin, France 32330
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
          <div className="visit-map-block">
            <iframe
              title="Gondrin Location"
              className="visit-map-iframe"
              src="https://www.google.com/maps?q=4+Rue+de+la+Force,+32330+Gondrin&output=embed"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutDetail;
