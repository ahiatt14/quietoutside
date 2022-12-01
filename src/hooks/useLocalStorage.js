import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

function getLocalStorageValue(key) {
  const valueStr = localStorage.getItem(key);
  return JSON.parse(valueStr);
}

function setLocalStorageValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export default (key) => {

  const [value, setValue] = useState(() => getLocalStorageValue(key));

  useEffect(() => {
    setLocalStorageValue(key, value);
  }, [key, value]);

  return [value, setValue];
}