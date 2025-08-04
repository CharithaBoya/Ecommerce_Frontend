import axios from 'axios'


const api = axios.create({
  baseURL: 'http://10.20.4.3:8080/product/api'
})


export const fetchProductById = (productId) => {
  return api.get(`product/api/getProductById?productId=${productId}`)
}

export const fetchSellersByProduct = (productId) => {
  return api.get(`/products/${productId}/sellers`)
}


export const fetchAllProducts = () => {
  return api.get('/products')
}

export const fetchCategories = () => {
  return api.get('/categories')
}

export const fetchMerchants = () => {
  return api.get('/merchants')
}

// Cart
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


