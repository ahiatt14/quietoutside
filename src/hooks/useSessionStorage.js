import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

function getSessionStorageValue(key) {
  const valueStr = sessionStorage.getItem(key);
  return JSON.parse(valueStr);
}

function setSessionStorageValue(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export default (key) => {

  const [value, setValue] = useState(() => getSessionStorageValue(key));

  useEffect(() => {
    setSessionStorageValue(key, value);
  }, [key, value]);

  return [value, setValue];
}