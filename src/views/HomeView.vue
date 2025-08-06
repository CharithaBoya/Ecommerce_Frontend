<template>
  <template v-if="auth.customer">
    <span class="welcome-text">Hi, {{ auth.customer.customerName }}</span>
  </template>

  <div class="home-wrapper">
    <Carousel />
    <Categories />
    <Products />
  </div>
</template>

<script setup>
import Carousel from '@/components/Carousel.vue'
import Categories from '@/components/Categories.vue'
import Products from '@/components/Products.vue'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore();
</script>

<style scoped>
.welcome-text {
  font-size: 1.3rem;
  font-weight: bold;
  color: #0a3d62;
  margin-top: 2rem;
  margin-bottom: 1rem;
  display: block;
  text-align: center;
  padding: 10px;
}

</style>