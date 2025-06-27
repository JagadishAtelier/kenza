// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getCartByUser,
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity
} from '../../Api/cartApi';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem('userDetails'));

  // Fetch cart items on load
  useEffect(() => {
    const fetchCart = async () => {
      if (!user?._id) return;
      try {
        const res = await getCartByUser(user._id);
        setCartItems(res); // `res` should be an array of cart products
      } catch (err) {
        console.error("❌ Fetch cart error", err);
      }
    };
    fetchCart();
  }, [user]);

  // Add product to cart
  const addToCart = async (product, quantity = 1) => {
    if (!user?._id) return;
    try {
      await addProductToCart(user._id, product._id, quantity); // Pass quantity to API
  
      const existing = cartItems.find(item => item.productId._id === product._id);
  
      if (existing) {
        setCartItems(prev =>
          prev.map(item =>
            item.productId._id === product._id
              ? { ...item, quantity: item.quantity + quantity } // Add selected quantity
              : item
          )
        );
      } else {
        setCartItems(prev => [...prev, { productId: product, quantity }]); // New product with quantity
      }
    } catch (err) {
      console.error("❌ Add to cart error", err);
    }
  };
  

  // Remove product from cart
  const removeFromCart = async (productId) => {
    if (!user?._id) return;
    try {
      await removeProductFromCart(user._id, productId);
      setCartItems(prev => prev.filter(item => item.productId._id !== productId));
    } catch (err) {
      console.error("❌ Remove from cart error", err);
    }
  };
  const clearCart = () => {
    setCartItems([]);
  };
  const updateQuantity = async (productId, type) => {
    const existingItem = cartItems.find(item => item.productId._id === productId);
    if (!existingItem) return;
  
    const currentQty = existingItem.quantity || 1;
    const newQty = type === 'inc' ? currentQty + 1 : Math.max(1, currentQty - 1);
  
    try {
      // ✅ Sync with backend
      await updateProductQuantity(user._id, productId, newQty);
  
      // ✅ Then update local state
      setCartItems(prev =>
        prev.map(item =>
          item.productId._id === productId
            ? { ...item, quantity: newQty }
            : item
        )
      );
    } catch (err) {
      console.error("❌ Failed to update quantity in backend:", err);
    }
  };
  
  
  
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart,clearCart,setCartItems,updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
