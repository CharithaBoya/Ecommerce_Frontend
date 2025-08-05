import { defineStore } from 'pinia'
import { placeOrder, fetchOrdersByCustomerId } from '@/services/apiServices'
import { useAuthStore } from './authStore'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: []
  }),

  getters: {
    allOrders(state) {
      return state.orders
    }
  },

  actions: {
    async fetchOrders() {
      const auth = useAuthStore()
      const customerId = auth.customer?.customerId
      if (!customerId) return

      try {
        const res = await fetchOrdersByCustomerId(customerId)
        this.orders = res.data
      } catch (err) {
        console.error('Failed to fetch orders:', err)
      }
    },

    async placeOrder(cartItems) {
      const auth = useAuthStore()
      const customerId = auth.customer?.customerId
      const customerEmail = auth.customer?.customerEmail

      if (!customerId || !customerEmail) return

      const orderPayload = {
        customerId,
        customerEmail,
        items: cartItems.map(item => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          productPrice: item.productPrice,
          sellerId: item.sellerId
        }))
      }

      try {
        await placeOrder(orderPayload)
      } catch (err) {
        console.error('Failed to place order:', err)
        throw err
      }
    }
  }
})
