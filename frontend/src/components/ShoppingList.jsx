// ShoppingList.jsx
import React, { useEffect, useState } from "react";
import Item from "./Item";
import { useCart } from "../contexts/CartContext";
import "../styles/App.css";

function ShoppingList() {
  const { addToCart } = useCart();
  const [itemList, setItemList] = useState([]);
  const [sortOption, setSortOption] = useState("priceLowToHigh");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => {
        setItemList(data);
      })
      .catch((error) => {
        console.error("Erreur pour la récupération des items: ", error);
      });
  }, []);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = itemList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
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
    <div id="shoppinglist-container" className="shoppinglist-container">
      <header id="shoppinglist-header" className="shoppinglist-header">
        <h2 className="shoppinglist-title">Sport 3000 Products</h2>
      </header>

      <main id="shoppinglist-main" className="shoppinglist-main">
        <div className="search-sort-bar">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <div className="sort-container">
            <label htmlFor="sort-select" className="sort-label">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="nameAZ">Name: A → Z</option>
              <option value="nameZA">Name: Z → A</option>
              <option value="onSaleFirst">On Sale First</option>
            </select>
          </div>
        </div>

        <section id="items-grid" className="items-grid">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.cover}
              description={
                item.description || "Premium sports equipment for athletes."
              }
              onSale={item.onSale}
              salesPrice={item.salesPrice}
              onAddToCart={() => addToCart(item)}
            />
          ))}
        </section>
      </main>
      {/* Footer is included at application level */}
    </div>
  );
}

export default ShoppingList;
