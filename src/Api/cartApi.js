// src/api/cartApi.js
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/cart`;

// Get user's cart
export const getCartByUser = async (userId) => {
  const res = await axios.get(`${BASE_URL}/${userId}`);
  return res.data.products; // adjust based on your backend response
};

// Add product to cart
export const addProductToCart = async (userId, productId, quantity = 1) => {
  return axios.post(`${BASE_URL}/add`, { userId, productId, quantity });
};

// Remove product from cart
export const removeProductFromCart = async (userId, productId) => {
  return axios.post(`${BASE_URL}/remove`, { userId, productId });
};
