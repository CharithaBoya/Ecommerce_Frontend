<template>
  <div class="order-history">
    <h2>Your Order History</h2>
    <div v-if="orders.length === 0" class="empty-message">
      🛒 Your products are waiting for you!
    </div>
    <div v-else class="order-list">
      <OrderCard v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>

<script>
import OrderCard from '../components/OrderCard.vue'
import { fetchOrdersByCustomerId } from '@/services/apiServices'
import { useAuthStore } from '../stores/authStore'

export default {
  name: "OrderHistory",
  components: {
    OrderCard
  },
  data() {
    return {
      orders: []
    };
  },
  async created() {
    const authStore = useAuthStore();
    const customerId = authStore.customer?.customerId;

    if (!customerId) {
      console.warn("Customer ID not found");
      return;
    }

    try {
      const response = await fetchOrdersByCustomerId(customerId);
      this.orders = response.data;
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching orders:", error);
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
