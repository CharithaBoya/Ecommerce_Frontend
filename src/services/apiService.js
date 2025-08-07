
// import axios from "axios";

// const BASE_URL = "http://10.20.4.3:8080/product";

// // Create axios instance
// const api = axios.create({
//   baseURL: BASE_URL
// });

// // Fetch all categories
// export const getAllCategories = async () => {
//   try {
//     const response = await api.get("/category/api/getAllCategories");
//     return response.data;
//   } catch (error) {
//     console.error("API fetch error:", error);
//     throw error;
//   }
// };

// // Fetch products by category
// export const getProductsByCategory = async (categoryId) => {
//   try {
//     const response = await api.get("/api/productsByCategory", {
//       params: { categoryId }
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching products by category:", error);
//     throw error;
//   }
// };
// export const getAllSellerProducts = () => {
//   return api.get(`${BASE_URL}/sellerproduct/api/getAllSellerProducts`);
// };
// // // Search products by name
// // export const searchProductsByName = (query) => {
// //   return api.get(`/searchbyname?query=${query}`);
// // };


// export const getProductById = (productId) => {
//   return api.get(`http://10.20.4.3:8080/product/api/getProductById?productId=${productId}`);
// };

import axios from "axios";
import { useAuthStore } from '@/stores/authStore';


const BASE_URL = "http://10.20.6.241:8080/product";


const api = axios.create({
  baseURL: BASE_URL
});

const getAuthHeaders = () => {
  const authStore = useAuthStore();
  const customerId = authStore.customer?.customerId;
  const customerEmail = authStore.customer?.customerEmail;

    return {
    'x-Skip-Auth': 'false' 
  };
  
};   

export const getAllCategories = async () => {
  try {
    const response = await api.get('getAllCategories', {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};


export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await api.get('getProductsByCategory', {
      params: { categoryId },
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};


export const getAllSellerProducts = async () => {
  try {
    const response = await api.get('getAllSellerProducts', {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching seller products:", error);
    throw error;
  }
};

export const searchProductsByName = async (query) => {
  try {
    const response = await api.get('/searchbyname', {
      params: { query },
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};

// export const getProductById = async (productId) => {
//   try {
//     const response = await axios.get(`http://10.20.3.40:8080/product/api/getProductById`, {
//       params: { productId },
//       headers: getAuthHeaders()
//     }); 
//     return response.data;
//   } catch (error) {
//     console.error("Get product by ID error:", error);
//     throw error;
//   }
// };

