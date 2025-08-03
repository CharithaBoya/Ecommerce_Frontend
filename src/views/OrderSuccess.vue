<template>
  <div class="success">
    <h2>🎉 Order Placed Successfully!</h2>
    <router-link to="/order-history">View Order History</router-link>
  </div>
</template>

<style scoped>
.success {
  text-align: center;
  margin-top: 100px;
}
.success h2 {
  color: green;
}
</style>
