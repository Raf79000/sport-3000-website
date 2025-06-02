// Home.jsx
import React, { useState, useEffect } from "react";
import { useCurrencySign } from "../contexts/CurrencySignContext";
import "../styles/App.css";

const API_BASE = "http://localhost:3000";

export default function HomeDetail() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { sign } = useCurrencySign();

  // Fetch items immediately
  useEffect(() => {
    fetch(`${API_BASE}/`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Erreur récupération items :", err));
  }, []);

  // Fake loading screen for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? items.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === items.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <span className="loading-text">Chargement...</span>
          <div className="neon-progress-container">
            <div className="neon-progress-bar" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="home-container" className="home-container">
      {/* Hero Video Section */}
      <section id="hero-section" className="hero-section">
        <video
          className="hero-video"
          src="/videos/s_Sport_Video_Generated.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-overlay">
          <h1 className="hero-title">Bienvenue chez Sport 3000</h1>
          <p className="hero-subtitle">
            Révolutionnez votre entraînement avec notre sélection rétro‐neon.
          </p>
        </div>
      </section>

      {/* Carousel Section */}
      <section id="carousel-section" className="carousel-section">
        <h2 className="section-heading">Nos Produits Vedettes</h2>
        <div className="carousel-container">
          <button className="carousel-btn left" onClick={prevSlide}>
            &#10094;
          </button>

          {/* Inline transform based on currentIndex */}
          <div
            className="carousel-slider"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item) => (
              <div key={item.id} className="carousel-item">
                <img
                  src={item.cover}
                  alt={item.name}
                  className="carousel-img"
                />
                <div className="carousel-info">
                  <h3 className="carousel-name">{item.name}</h3>
                  <p className="carousel-price">
                    {item.onSale
                      ? `${sign}${item.salesPrice.toFixed(2)}`
                      : `${sign}${item.price.toFixed(2)}`}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-btn right" onClick={nextSlide}>
            &#10095;
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="home-about" className="about-section">
        <h2 className="about-title">À Propos de Sport 3000</h2>
        <div className="about-content">
          <p className="paragraph">
            Sport 3000, fondé en 2023, puise son inspiration dans les années 80/90 :
            une époque où l’énergie du sport résonnait dans les rues. Nous avons pour
            mission de proposer des équipements alliant performance moderne et
            esthétique rétro‐neon.
          </p>
          <p className="paragraph">
            Notre équipe de passionnés travaille quotidiennement pour repousser les
            limites : choisir des matériaux durables, tester chaque produit en
            situation réelle, et concevoir des designs vibrants qui vous feront
            sortir du lot sur le terrain comme en salle.
          </p>
        </div>
      </section>
    </div>
  );
}
