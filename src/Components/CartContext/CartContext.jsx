import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getCartByUser,
  addProductToCart,
  removeProductFromCart,
  // Optional: include if your backend supports quantity updates
  // updateCartQuantity 
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
        setCartItems(res); // Expected: array of { productId, quantity }
      } catch (err) {
        console.error("❌ Fetch cart error", err);
      }
    };
    fetchCart();
  }, [user]);

  // Add product to cart
  const addToCart = async (product) => {
    if (!user?._id) return;
    try {
      await addProductToCart(user._id, product._id, 1);
      const existing = cartItems.find(item => item.productId._id === product._id);

      if (existing) {
        setCartItems(prev =>
          prev.map(item =>
            item.productId._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCartItems(prev => [...prev, { productId: product, quantity: 1 }]);
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

  // Update quantity of product
  const updateQuantity = async (productId, type) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.productId._id === productId) {
          let newQty = item.quantity;
          if (type === 'inc') newQty += 1;
          if (type === 'dec') newQty = Math.max(1, item.quantity - 1);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );

    // Optionally sync to backend if supported
    // await updateCartQuantity(user._id, productId, newQty);
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
