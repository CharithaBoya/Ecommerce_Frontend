<template>
  <div class="profile">
    <h2 class="title">My Profile</h2>

    <div v-if="customer">
      <div class="field"><strong>Full Name:</strong> {{ customer.name }}</div>
      <div class="field"><strong>Phone:</strong> {{ customer.phone }}</div>
      <div class="field"><strong>Email:</strong> {{ customer.email }}</div>
      <div class="field"><strong>Address:</strong> {{ customer.address }}</div>
    </div>

    <div v-else>
      <p>You are not logged in. Please <router-link to="/login">Login</router-link>.</p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore'; 
import { mapState } from 'pinia';

export default {
  name: 'UserProfile',
  computed: {
    ...mapState(useAuthStore, ['customer'])
  }
}
</script>

<style scoped>
.profile {
  max-width: 500px;
  margin: 80px auto;
  padding: 24px;
  border: 1px solid #eee;
  border-radius: 10px;
  background: #f3f3f3;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.field {
  margin-bottom: 12px;
  font-size: 16px;
}
</style>
