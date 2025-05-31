// src/utils/currencySignStorage.js
const KEY = 'currencySign';

export function getStoredSign() {
  return localStorage.getItem(KEY) || '$';  // default to $
}

export function setStoredSign(sign) {
  localStorage.setItem(KEY, sign);
}
