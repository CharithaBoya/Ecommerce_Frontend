import axios from 'axios'


const api = axios.create({
  baseURL: 'http://10.20.4.3:8080/product/api'
})


export const fetchProductById = (productId) => {
  return api.get(`product/api/getProductById?productId=${productId}`)
}

export const getSellerIdsForProduct = (productId) => {
  return axios.get(`http://10.20.4.3:8080/sellerproduct/api/getSellerIdsForProduct`, {
    params: { productId }
  });
};

export const getSellerById = (productId, sellerId) => {
  return axios.get(`http://10.20.4.3:8080/sellerproduct/api/getDetails/SellerIdAndProductId`, {
    params: { productId, sellerId }
  });
};
export const getSellerNameById = async (sellerId) => {
  try {
    const response = await axios.get(`http://10.20.4.3:8383/seller/api/getSellerById`, {
      params: { sellerId }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching seller by ID:", error);
    throw error;
  }
};

export const fetchAllProducts = () => {
  return api.get('/products')
}

export const fetchCategories = () => {
  return api.get('/categories')
}

export const fetchMerchants = () => {
  return api.get('/merchants')
}

export const postCartItem = (payload) => {
  return api.post('http://10.20.3.43:8081/api/cart/add', payload);
};


export const getCartItems = (customerId) => {
  return api.get(`http://10.20.3.43:8081/api/cart/${customerId}`);
};


export const updateCartQuantity = (payload) => {
  return api.put('/cart/update', payload);
};


export const deleteCartItem = (customerId, productId) => {
  return api.delete(`/cart/${customerId}/remove/${productId}`);
};


export const clearCartItems = (customerId) => {
  return api.delete(`/cart/${customerId}/clear`);
};


