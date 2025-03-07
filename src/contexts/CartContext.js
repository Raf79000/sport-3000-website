import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
        return updatedCart;
      } else {
        // Item doesn't exist, add new item with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    console.log(`Added ${item.name} to cart`);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      const item = updatedCart[indexToRemove];
      
      if (item.quantity > 1) {
        // If quantity > 1, decrease quantity
        updatedCart[indexToRemove] = {
          ...item,
          quantity: item.quantity - 1
        };
        return updatedCart;
      } else {
        // If quantity is 1, remove the item
        return updatedCart.filter((_, index) => index !== indexToRemove);
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);