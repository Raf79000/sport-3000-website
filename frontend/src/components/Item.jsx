import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Item.css';

const Item = ({ name, price, imageUrl, description, onSale, salesPrice, onAddToCart }) => {
    return (
        <div className="merch-item">
            <img src={imageUrl} alt={name} className="item-image" />
            <div className="item-details">
                <h3 className="item-name">{name}</h3>
                <div className="item-price-container">
                    {onSale === 1 && <p className="item-sales-price">${salesPrice.toFixed(2)}</p>}
                    <p className="item-price">{onSale === 1 ? <del>${price.toFixed(2)}</del> : `$${price.toFixed(2)}`}</p>
                </div>
                <p className="item-description">{description}</p>
                {onSale === 1 && <div className='sales'>Soldes</div>}
                <button 
                    className="add-to-cart-btn"
                    onClick={onAddToCart}
                >
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
    onAddToCart: PropTypes.func
};

export default Item;