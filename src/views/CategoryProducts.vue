<template>
  <div>
    <h2>Products in {{ categoryName }} Category</h2>
    <div v-if="products.length" class="product-container">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="product-card"
        @click="goToProduct(product.productId)"
      >
        <h3 class="product-name">{{ product.productName }}</h3>
        <p class="product-description">{{ product.productDescription }}</p>
        <img class="product-image" :src="product.productImageUrl" :alt="product.productName"  />
    
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
.product-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  justify-content: space-evenly;
}

.product-card {
  width: 250px;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  background-color: #badccc;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-name {
  margin: 0.5rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.product-description {
  margin: 6px 0;
  color: #555;
  font-size: 16px;
  text-align: center;
  text-align: justify;
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  margin-top: 0.5rem;
  border-radius: 6px;
  
}
</style>
