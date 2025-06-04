// utils/localStorageHelpers.js
export const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
  };
  
  export const addToLocalStorage = (key, id) => {
    const items = getFromLocalStorage(key);
    if (!items.includes(id)) {
      items.push(id);
      localStorage.setItem(key, JSON.stringify(items));
    }
  };
  
  export const removeFromLocalStorage = (key, id) => {
    const items = getFromLocalStorage(key).filter((itemId) => itemId !== id);
    localStorage.setItem(key, JSON.stringify(items));
  };
  
  export const isInLocalStorage = (key, id) => {
    const items = getFromLocalStorage(key);
    return items.includes(id);
  };
  