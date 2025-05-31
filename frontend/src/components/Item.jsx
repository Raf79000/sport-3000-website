// Item.jsx
import React from "react";
import PropTypes from "prop-types";
import { useCurrencySign } from "../contexts/CurrencySignContext";
import "../styles/App.css";

const Item = ({
  name,
  price,
  imageUrl,
  description,
  onSale,
  salesPrice,
  onAddToCart,
}) => {
  const { sign } = useCurrencySign();

  return (
    <div>
      <img src={imageUrl} alt={name} className="card-img-top" />
      <div>
        <h3>{name}</h3>
        <div>
          {onSale === 1 && (
            <p>{`${sign}${salesPrice.toFixed(2)}`}</p>
          )}
          <p>
            {onSale === 1 ? (
              <del>{`${sign}${price.toFixed(2)}`}</del>
            ) : (
              `${sign}${price.toFixed(2)}`
            )}
          </p>
        </div>
        <p>{description}</p>
        {onSale === 1 && <div>Soldes</div>}
        <button className="btn btn-primary mt-md" onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

Item.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func,
};

export default Item;
