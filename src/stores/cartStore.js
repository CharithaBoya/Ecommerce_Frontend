import { defineStore } from 'pinia'
import { postCartItem, getCartItems, deleteCartItem } from '../services/apiServices'
import { useAuthStore } from './authStore';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  actions: {
    async fetchCartItems() {
      const auth = useAuthStore();
      const customerId = auth.customerId;
      if (!customerId) return;

      const res = await getCartItems(customerId);
      this.items = res.data
    },

    async addToCart(item) {
      await postCartItem(item)
      this.items.push(item)
    },

    async removeFromCart(productId) {
      const auth = useAuthStore();
      const customerId = auth.customerId;
      if (!customerId) return;

      await deleteCartItem(customerId, productId);
      await this.fetchCart();
    },
    async updateQty(productId, qty) {
    await apiUpdateCart(productId, qty)
    const item = this.items.find(i => i.productId === productId)
    if (item) {
        item.quantity = qty
    }
  },async clearCart() {
      await clearCartItems()
      this.items = []
    }
  
  }
})
