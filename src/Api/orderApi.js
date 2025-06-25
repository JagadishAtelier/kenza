// src/api/orderApi.js
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/orders`;

// 1. Create a new order
export const createOrder = async (orderData) => {
  const res = await axios.post(`${BASE_URL}`, orderData);
  return res.data.data; // created order
};

// 2. Get all orders (for admin panel or order history)
export const getAllOrders = async () => {
  const res = await axios.get(`${BASE_URL}`);
  return res.data.data; // list of orders
};

// 3. Get order by ID (details page)
export const getOrderById = async (orderId) => {
  const res = await axios.get(`${BASE_URL}/${orderId}`);
  return res.data.data; // single order
};

// 4. Update order (admin side: status change, etc.)
export const updateOrder = async (orderId, updatedData) => {
  const res = await axios.put(`${BASE_URL}/${orderId}`, updatedData);
  return res.data.data;
};

// 5. Delete order (admin panel)
export const deleteOrder = async (orderId) => {
  const res = await axios.delete(`${BASE_URL}/${orderId}`);
  return res.data.message; // confirmation message
};

// 6. Optional: Seed orders (dev/testing)
export const seedOrders = async () => {
  const res = await axios.post(`${BASE_URL}/seed`);
  return res.data.data;
};
// 7. Get orders by user ID
export const getOrdersByUser = async (userId) => {
    const res = await axios.get(`${BASE_URL}/user/${userId}`);
    return res.data.data; // Returns array of order objects
  };
  
  