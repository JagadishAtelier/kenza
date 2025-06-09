import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.text === item.text);
      if (existingItemIndex !== -1) {
        // Reset quantity to 1 if item already exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity = 1;
        return updatedItems;
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, type) => {
    setCartItems(prevItems => {
      const updated = [...prevItems];
      const currentQty = parseInt(updated[index].quantity || 1);
  
      if (type === 'inc') {
        updated[index].quantity = currentQty + 1;
      } else if (type === 'dec') {
        updated[index].quantity = Math.max(1, currentQty - 1);
      }
  
      return updated;
    });
  };
  

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
