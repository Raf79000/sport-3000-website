// src/CurrencySignContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getStoredSign, setStoredSign } from '../utils/currencySign';

const CurrencySignContext = createContext({
  sign: '$',
  setSign: s => {}
});

export function CurrencySignProvider({ children }) {
  const [sign, setSignState] = useState(getStoredSign());

  // update storage + state
  const setSign = newSign => {
    setStoredSign(newSign);
    setSignState(newSign);
  };

  // (optional) keep multiple tabs in sync
  useEffect(() => {
    function onStorage(e) {
      if (e.key === 'currencySign') {
        setSignState(e.newValue || '$');
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <CurrencySignContext.Provider value={{ sign, setSign }}>
      {children}
    </CurrencySignContext.Provider>
  );
}

export function useCurrencySign() {
  return useContext(CurrencySignContext);
}
