import axios from 'axios';
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/customer-details`; // ✅ Use the dash!


export const createCustomerDetails = async (details) => {
  // details = { userId, phone, DOB, gender }
  const res = await axios.post(`${BASE_URL}/create`, details);
  return res.data;
};

export const getCustomerDetails = async (userId) => {
  const res = await axios.get(`${BASE_URL}/${userId}`);
  return res.data;
};


export const updateCustomerDetails = async (userId, updatedData) => {
  // updatedData = { phone, DOB, gender }
  const res = await axios.put(`${BASE_URL}/${userId}`, updatedData);
  return res.data;
};

export const deleteCustomerDetails = async (userId) => {
  const res = await axios.delete(`${BASE_URL}/${userId}`);
  return res.data;
};
// customerDetailsApi.js
export const updateUserBasicInfo = async (userId, payload) => {
    const res = await axios.put(`${BASE_URL}/update-info/${userId}`, payload);
    return res.data;
  };
  