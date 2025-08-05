import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const api = axios.create({
  baseURL: 'http://10.20.4.3:8080/product/api'
})


const getAuthHeaders = () => {
  const authStore = useAuthStore();
  const customerId = authStore.customer?.customerId;
  const customerEmail = authStore.customer?.customerEmail;

  return {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'X-Customer-Email': customerEmail,
    'Customer-Id': customerId
  };
};

export const fetchProductById = (productId) => {
  return api.get(`/getProductById?productId=${productId}`)
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


export const getSellerIdsForProduct = (productId) => {
  return axios.get(`http://10.20.4.3:8080/sellerproduct/api/getSellerIdsForProduct`, {
    params: { productId }
  })
}

export const getSellerById = (productId, sellerId) => {
  return axios.get(`http://10.20.4.3:8080/sellerproduct/api/getDetails/SellerIdAndProductId`, {
    params: { productId, sellerId }
  })
}

export const getSellerNameById = async (sellerId) => {
  try {
    const response = await axios.get(`http://10.20.4.3:8383/seller/api/getSellerById`, {
      params: { sellerId }
    })
    return response.data
  } catch (error) {
    console.error("Error fetching seller by ID:", error)
    throw error
  }
}



export const postCartItem = (payload) => {
  return axios.post('http://10.20.3.43:8081/api/cart/add', payload, {
    headers: getAuthHeaders()
  })
}

export const getCartItems = (customerId) => {
  return axios.get(`http://10.20.3.43:8081/api/cart/${customerId}`, {
    headers: getAuthHeaders()
  })
}

export const updateCartQuantity = (payload) => {
  return axios.put('http://10.20.3.43:8081/api/cart/update', payload, {
    headers: getAuthHeaders()
  })
}

export const deleteCartItem = (customerId, productId) => {
  return axios.delete(`http://10.20.3.43:8081/api/cart/${customerId}/remove/${productId}`, {
    headers: getAuthHeaders()
  })
}

export const clearCartItems = (customerId) => {
  return axios.delete(`http://10.20.3.43:8081/api/cart/${customerId}/clear`, {
    headers: getAuthHeaders()
  })
}

export const placeOrder = (customerId) => {
  return axios.post(`http://10.20.3.43:8081/api/cart/${customerId}/checkout`, {
    headers: getAuthHeaders()
  });
};

export const fetchOrdersByCustomerId = (customerId) => {
  return axios.get(`http://10.20.3.40:8085/orders/getOrderHistory/${customerId}`, {
    headers: getAuthHeaders()
  });
};
