// FavoritesDetail.jsx
import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";
import Item from "../components/Item";
import "../styles/App.css";

const FavoritesDetail = () => {
  const { addToCart } = useCart();
  const { favorites } = useFavorites(); // array of item objects
  const [favoriteList, setFavoriteList] = useState([]);
  const [sortOption, setSortOption] = useState("priceLowToHigh");
  const [searchTerm, setSearchTerm] = useState("");

  // Whenever the context’s favorites change, update local state
  useEffect(() => {
    setFavoriteList(favorites);
  }, [favorites]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter favorites by name (case‐insensitive)
  const filteredFavorites = favoriteList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the filtered list
  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortOption) {
      case "priceLowToHigh":
        return a.price - b.price;
      case "priceHighToLow":
        return b.price - a.price;
      case "nameAZ":
        return a.name.localeCompare(b.name);
      case "nameZA":
        return b.name.localeCompare(a.name);
      case "onSaleFirst":
        return b.onSale - a.onSale;
      default:
        return 0;
    }
  });

  return (
    <div id="favorites-container" className="shopping-container">
      <header id="favorites-header" className="shopping-header">
        <h2 className="shopping-title">Mes Favoris</h2>
      </header>

      <main>
        <div
          className="search-sort-bar flex"
          style={{ gap: "1rem", marginBottom: "1rem" }}
        >
          <input
            type="text"
            placeholder="Rechercher dans les favoris..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <div className="sort-container">
            <label className="sort-label">
              Trier par :{" "}
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="sort-select"
              >
                <option value="priceLowToHigh">Prix : croissant</option>
                <option value="priceHighToLow">Prix : décroissant</option>
                <option value="nameAZ">Nom : A → Z</option>
                <option value="nameZA">Nom : Z → A</option>
                <option value="onSaleFirst">En promo d'abord</option>
              </select>
            </label>
          </div>
        </div>

        {sortedFavorites.length > 0 ? (
          <div className="items-grid">
            {sortedFavorites.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.cover}
                description={
                  item.description || "Équipement sportif haute qualité."
                }
                onSale={item.onSale}
                salesPrice={item.salesPrice}
                onAddToCart={() => addToCart(item)}
              />
            ))}
          </div>
        ) : (
          <p className="no-items-text">Vous n'avez aucun article en favoris.</p>
        )}
      </main>
    </div>
  );
};

export default FavoritesDetail;
