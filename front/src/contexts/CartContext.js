import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState(() => {
    try {
      const localCart = localStorage.getItem('cart');
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Update localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

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
    // Also clear localStorage
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);