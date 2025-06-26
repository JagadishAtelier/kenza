import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/address`;

// Create address
export const createCustomerAddress = async (data) => {
  // data = { userId, houseNo, street, landMark, city, district, state, pincode }
  const res = await axios.post(`${BASE_URL}/create`, data);
  return res.data;
};

// Get address by user ID
export const getCustomerAddress = async (userId) => {
  const res = await axios.get(`${BASE_URL}/${userId}`);
  return res.data;
};

// Update address by user ID
export const updateCustomerAddress = async (userId, updatedData) => {
  // updatedData = { houseNo, street, landMark, city, district, state, pincode }
  const res = await axios.put(`${BASE_URL}/${userId}`, updatedData);
  return res.data;
};

// Delete address by user ID
export const deleteCustomerAddress = async (userId) => {
  const res = await axios.delete(`${BASE_URL}/${userId}`);
  return res.data;
};
