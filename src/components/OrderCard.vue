<template>
  <div class="order-card">
    <h3>Order #{{ order.id }}</h3>
    <p>Placed at: {{ order.placedAt }}</p>
    <ul>
      <li v-for="item in order.items" :key="item.name">
        {{ item.name }} — ₹{{ item.price }} x {{ item.quantity }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "OrderCard",
  props: {
    order: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.order-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
}
</style>
