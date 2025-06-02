// Item.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useCurrencySign } from "../contexts/CurrencySignContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/App.css";

const Item = ({
  id,
  name,
  price,
  imageUrl,
  description,
  onSale,
  salesPrice,
  onAddToCart,
}) => {
  const { sign } = useCurrencySign();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorite(id);

  const toggleFavorite = () => {
    if (favorited) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  return (
    <div className="card item-card">
      <div className="card-image-wrapper">
        <Link to={`/detail/${id}`}>
          <img
            src={imageUrl}
            alt={name}
            className="card-img-top cursor-pointer"
          />
        </Link>
        <button
          className={`favorite-btn ${favorited ? "favorited" : ""}`}
          onClick={toggleFavorite}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          {favorited ? (
            <FaHeart className="heart-icon" />
          ) : (
            <FaRegHeart className="heart-icon" />
          )}
        </button>
      </div>

      <div className="card-content item-card-body">
        <h3 className="item-name">{name}</h3>
        <div className="item-pricing">
          {onSale === 1 && (
            <p className="item-sale-price">
              {`${sign}${salesPrice.toFixed(2)}`}
            </p>
          )}
          <p className="item-regular-price">
            {onSale === 1 ? (
              <del>{`${sign}${price.toFixed(2)}`}</del>
            ) : (
              `${sign}${price.toFixed(2)}`
            )}
          </p>
        </div>
        <p className="item-description">{description}</p>
        {onSale === 1 && <div className="sale-badge">Soldes</div>}
        <button className="btn btn-primary mt-md" onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func,
  onSale: PropTypes.number,
  salesPrice: PropTypes.number,
};

export default Item;
