<!-- src/components/ProductCard.vue -->
<template>
  <div class="product-card" @click="goToProduct">
    <img :src="product.productImageUrl" alt="Product image" />
    <h4>{{ product.productName }}</h4>
    <p>₹{{ product.productPrice }}</p>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: Object
  },
  methods: {
    goToProduct() {
      this.$router.push(`/product/${this.product.productId}`);
    }
  }
};
</script>

<style scoped>
.product-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 1px 5px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}
.product-card:hover {
  transform: translateY(-3px);
}
.product-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 0.5rem;
}
</style>

