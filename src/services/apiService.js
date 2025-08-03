// src/services/apiService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080";

// Fetch all categories
export const getAllCategories = async () => {
  const response = await axios.get(`${BASE_URL}/api/getAllCategories`);
  return response.data;
};
// src/services/apiService.js

export const searchProductsByName = (query) => {
  return api.get(`/searchbyname?query=${query}`);
};


// You can add more functions later here like getProductById, searchByName, etc.
