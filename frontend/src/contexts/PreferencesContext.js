// src/contexts/PreferencesContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

// 1) Create the context
const PreferencesContext = createContext();

/**
 * 2) PreferencesProvider
 * Wrap your App with this provider so that any component can read or toggle preferences.
 */
export function PreferencesProvider({ children }) {
  // Initialize darkMode from localStorage (fallback to false if not set)
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem("darkMode");
      return stored === "true"; // if "true", darkMode = true; else false
    } catch (err) {
      console.error("Failed to read darkMode from localStorage:", err);
      return false;
    }
  });

  // Whenever darkMode changes, persist it to localStorage and toggle <body> class
  useEffect(() => {
    try {
      localStorage.setItem("darkMode", darkMode);
    } catch (err) {
      console.error("Failed to save darkMode to localStorage:", err);
    }
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // A simple toggle function
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <PreferencesContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </PreferencesContext.Provider>
  );
}

/**
 * 3) usePreferences hook
 * Simplifies consuming the context in function components.
 */
export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error(
      "usePreferences must be used within a PreferencesProvider"
    );
  }
  return context;
}
