// src/contexts/FavoritesContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Replace with your actual API base URL
const API_BASE = "http://localhost:3000";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]); // array of item objects or IDs
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch favorites whenever userId changes
  useEffect(() => {
    if (!userId || !token) {
      setFavorites([]);
      return;
    }
    fetch(`${API_BASE}/favorites/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch favorites");
        return res.json();
      })
      .then((data) => {
        // data is a list of item objects
        setFavorites(data);
      })
      .catch((err) => {
        console.error("Error loading favorites:", err);
        setFavorites([]);
      });
  }, [userId, token]);

  // Helper: is item favorited?
  const isFavorite = (itemId) => {
    return favorites.some((item) => item.id === itemId);
  };

  // Add an item to favorites
  const addFavorite = (itemId) => {
    if (!userId || !token) return;
    fetch(`${API_BASE}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: Number(userId), itemId: Number(itemId) }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add favorite");
        // Option A: Re-fetch all favorites:
        return fetch(`${API_BASE}/favorites/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((res2) => {
        if (!res2.ok) throw new Error("Failed to refresh favorites");
        return res2.json();
      })
      .then((updatedList) => setFavorites(updatedList))
      .catch((err) => console.error(err));
  };

  // Remove an item from favorites
  const removeFavorite = (itemId) => {
    if (!userId || !token) return;
    fetch(`${API_BASE}/favorites/${userId}/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to remove favorite");
        // Option A: Re-fetch all favorites:
        return fetch(`${API_BASE}/favorites/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((res2) => {
        if (!res2.ok) throw new Error("Failed to refresh favorites");
        return res2.json();
      })
      .then((updatedList) => setFavorites(updatedList))
      .catch((err) => console.error(err));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
