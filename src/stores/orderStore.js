
import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [],
    orderIdCounter: 1,
  }),
  getters: {
    allOrders: (state) => state.orders,
  },
  actions: {
    placeOrder(items) {
      const timestamp = new Date().toLocaleString()
      const newOrder = {
        id: this.orderIdCounter++,
        placedAt: timestamp,
        items: [...items]
      }
      this.orders.unshift(newOrder)
    },
    clearOrders() {
      this.orders = []
    }
  }
})
