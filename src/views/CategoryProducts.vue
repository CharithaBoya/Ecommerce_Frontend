<template>
  <div>
    <h2>Products in {{ categoryName }} Category</h2>

    <div v-if="paginatedProducts.length" class="product-container">
      <div
        v-for="(product, index) in paginatedProducts"
        :key="index"
        class="product-card"
        @click="goToProduct(product.id)"
      >
        <h3 class="product-name">{{ product.productName }}</h3>
        <p class="product-description">{{ product.productDescription }}</p>
        <img
          class="product-image"
          :src="product.productImageUrl"
          @error="handleImageError"
          :alt="product.productName"
        />
      </div>
    </div>
    <p v-else>No products found.</p>

    
    <div v-if="products.length" class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
import { getProductsByCategory } from "@/services/apiService";
import defaultImage from '@/assets/default-product.avif'
export default {
  name: "CategoryProducts",
  data() {
    return {
      categoryId: this.$route.params.categoryId,
      products: [],
      currentPage: 1,
      pageSize: 3, 
      categoryName: this.$route.params.categoryName || "",
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.pageSize);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.products.slice(start, end);
    },
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    handleImageError(event) {
      event.target.src = defaultImage
    },
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
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
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
  text-align: justify;
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  margin-top: 0.5rem;
  border-radius: 6px;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #444;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>