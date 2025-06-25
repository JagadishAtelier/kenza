import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getWishlistByUser,
  addProductToWishlist,
  removeProductFromWishlist
} from '../../Api/wishlistApi';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem('userDetails'));
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?._id) return;
      try {
        const res = await getWishlistByUser(user._id);
        setWishlist(res); // `res` is an array of product objects
      } catch (err) {
        console.error("❌ Fetch wishlist error", err);
      }
    };

    fetchWishlist();
  }, [user]);

  const addToWishlist = async (product) => {
    if (!user?._id){
      console.log("user id is notexist")
    };
    try {
      await addProductToWishlist(user._id, product._id);
      if (!wishlist.some(p => p._id === product._id)) {
        setWishlist(prev => [...prev, product]);
      }
    } catch (err) {
      console.error("❌ Add to wishlist error", err);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user?._id) return;
    try {
      await removeProductFromWishlist(user._id, productId);
      setWishlist(prev => prev.filter(p => p._id !== productId));
    } catch (err) {
      console.error("❌ Remove from wishlist error", err);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
