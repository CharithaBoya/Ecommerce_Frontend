<template>
  <div class="order-history">
    <h2>Your Order History</h2>
    <div v-if="allOrders.length === 0" class="empty-message">
      🛒 Your products are waiting for you!
    </div>
    <div v-else class="order-list">
      <OrderCard v-for="order in allOrders" :key="order.id" :order="order" />
    </div>
  </div>
</template>

<script>
import OrderCard from '../components/OrderCard.vue'
import { mapGetters } from 'pinia'
import { useOrderStore } from '../stores/orderStore'


export default {
  name: "OrderHistory",
  components: {
    OrderCard
  },
  computed: {
    ...mapGetters(useOrderStore, ['allOrders'])
  }
}
</script>

<style scoped>
.order-history {
  padding: 24px;
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
