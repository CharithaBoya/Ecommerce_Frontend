import { defineStore } from 'pinia'
import {
  postCartItem,
  getCartItems,
  deleteCartItem,
  updateCartQuantity,
  clearCartItems
} from '../services/apiServices'
import { useAuthStore } from './authStore'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  actions: {
    async fetchCartItems() {
      const auth = useAuthStore();
      const customerId = auth.customer.customerId ;
      const token = auth.jwt;
      const email = auth.customerEmail;

      if (!customerId) return;

      console.log(customerId);
      const res = await getCartItems(customerId);
      
      console.log(res.data);
      this.items = res.data;
    },

    async addToCart(item) {
      const auth = useAuthStore();
      const token = auth.jwt;
      const email = auth.customer.customerEmail;

      await postCartItem(item, token,email);
      await this.fetchCartItems();
    },

    async removeFromCart(productId) {
      const auth = useAuthStore();
      const customerId = auth.customerId || localStorage.getItem('customerId');
      const token = auth.jwt;
      const email = auth.customerEmail;

      if (!customerId) return;

      await deleteCartItem(customerId, productId, token, email);
      await this.fetchCartItems();
    },

    async updateCartQuantity({ productId, quantity }) {
      const auth = useAuthStore();
      const token = auth.jwt;
      const email = auth.customerEmail;

      const payload = { productId, quantity };
      await updateCartQuantity(payload, token, email);
      await this.fetchCartItems();
    },

    async clearCart() {
      const auth = useAuthStore();
      const customerId = auth.customerId || localStorage.getItem('customerId');
      const token = auth.jwt;
      const email = auth.customerEmail;

      if (!customerId) return;

      await clearCartItems(customerId, token, email);
      this.items = [];
    }
  }
});
