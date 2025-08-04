<template>
  <div>
    <h2>Products in {{ categoryName }} Category</h2>
    <div v-if="products.length">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="product-card"
        @click="goToProduct(product.productId)"
      >
        <h3>{{ product.productName }}</h3>
        <p>{{ product.productDescription }}</p>
    
      </div>
    </div>
    <p v-else>No products found.</p>
  </div>
</template>

<script>
import { getProductsByCategory } from "@/services/apiService";
export default {
  name: "CategoryProducts",
  data() {
    return {
      categoryId: this.$route.params.categoryId,
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const data = await getProductsByCategory(this.categoryId);
        this.products = data;
      } catch (error) {
        console.error("Error loading category products:", error);
      }
    },
    goToProduct(productId) {
    this.$router.push(`/product/${productId}`);
  },
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}
</style>
