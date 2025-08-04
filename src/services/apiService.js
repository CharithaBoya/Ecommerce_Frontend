// src/services/apiService.js
import axios from "axios";

const BASE_URL = "http://10.20.4.3:8080";

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL
});

// Fetch all categories
export const getAllCategories = async () => {
  try {
    const response = await api.get("/category/api/getAllCategories");
    return response.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

// Fetch products by category
export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await api.get("/product/api/productsByCategory", {
      params: { categoryId }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

// Search products by name
export const searchProductsByName = (query) => {
  return api.get(`/searchbyname?query=${query}`);
};
