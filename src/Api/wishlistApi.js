import axios from 'axios';
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/wishlist`;

export const getWishlistByUser = async (userId) => {
  const res = await axios.get(`${BASE_URL}/${userId}`);
  return res.data.products;
};

export const addProductToWishlist = async (userId, productId) => {
  return axios.post(`${BASE_URL}/add`, { userId, productId });
};

export const removeProductFromWishlist = async (userId, productId) => {
  return axios.post(`${BASE_URL}/remove`, { userId, productId });
};
