<template>
  <div class="order-history">
    <h2>Your Order History</h2>

    <div v-if="orders.length === 0" class="empty-message">
      🛒 Your products are waiting for you!
    </div>

    <div v-else class="order-list">
      <OrderCard 
        v-for="order in orders" 
        :key="order.id" 
        :order="order" 
      />
    </div>
  </div>
</template>

<script>
import OrderCard from '../components/OrderCard.vue'
import { fetchOrdersByCustomerId } from '@/services/apiServices'
import { mapGetters, mapActions } from 'pinia'
import { useAuthStore } from '../stores/authStore'

export default {
  name: "OrderHistory",
  components: {
    OrderCard
  },
  data() {
    return {
      orders: []
    }
  },
  computed: {
    ...mapGetters(useAuthStore, ['getCustomer', 'getIsLoggedIn'])
  },
  methods: {
 

    async loadOrders() {
      const customerId = this.getCustomer?.customerId
      if (!customerId) {
        console.warn("Customer ID not found")
        return
      }

      try {
        const response = await fetchOrdersByCustomerId(customerId)
        this.orders = response.data
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching orders:", error)
      }
    }
  },
  created() {
    if (this.getIsLoggedIn) {
      this.loadOrders()
    }
  }
}
</script>

<style scoped>
.order-history {
  padding: 24px;
  margin: 2rem auto;
}
.empty-message {
  text-align: center;
  font-size: 18px;
  color: #666;
}
.order-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
