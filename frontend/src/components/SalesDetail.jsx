// SalesDetail.jsx
import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import Item from "../components/Item";
import "../styles/App.css";

const SalesDetail = () => {
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
        console.error("Erreur pour la récupération des vêtements: ", error);
      });
  }, []);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = itemList
    .filter((item) => item.onSale === 1)
    .filter((item) =>
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
    <div>
      <header>
        <h1>Sales Page</h1>
      </header>
      <main>
        <p>This is the sales page where you can find items on sale.</p>
        <div className="search-sort-bar flex" style={{ gap: "1rem", marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <div>
            <label>
              Sort by:{" "}
              <select value={sortOption} onChange={handleSortChange}>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="nameAZ">Name: A → Z</option>
                <option value="nameZA">Name: Z → A</option>
                <option value="onSaleFirst">On Sale First</option>
              </select>
            </label>
          </div>
        </div>

        <div>
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
        </div>
      </main>
      {/* Footer is included at application level */}
    </div>
  );
};

export default SalesDetail;
