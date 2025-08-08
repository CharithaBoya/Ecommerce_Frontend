<template>
  <div class="products-wrapper">
    <h2>Products</h2>

    <div v-if="loading">Loading products...</div>
    <div v-else>
      <div class="product-grid">
        <router-link
          v-for="product in paginatedProducts"
          :key="product.sellerId + '-' + product.productId"
          :to="`/product/${product.productId}`"
          class="product-card-link"
        >
          <div class="product-card">
            <img
              v-if="product.productImageUrl"
              :src="product.productImageUrl"
              @error="handleImageError"
              alt="Product Image"
              class="product-image"
            />
            <h3 class="product-name">{{ product.productName }}</h3>
            <p class="product-brand">{{ product.productBrand }}</p>
            <p class="product-price">₹{{ product.productPrice }}</p>
            <p class="product-rating">⭐ {{ product.productRating }}</p>
            <p class="product-quantity">Quantity: {{ product.productQuantity }}</p>
            <p class="product-orders">Sold: {{ product.productOrderedCompleted }}</p>
          </div>
        </router-link>
      </div>

      
      <div class="pagination" v-if="products.length > pageSize">
        <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllSellerProducts } from "@/services/apiService";
import defaultImage from '@/assets/default-product.avif'
export default {
  name: "Products",
  data() {
    return {
      products: [],
      loading: false,
      currentPage: 1,
      pageSize: 5, 
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.pageSize);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.products.slice(start, start + this.pageSize);
    },
  },
  async created() {
    this.loading = true;
    try {
      const res = await getAllSellerProducts();
      this.products = res || [];
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
     handleImageError(event) {
      event.target.src = defaultImage
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

<style lang="scss" scoped>
.products-wrapper {
  padding: 2rem;
  background: linear-gradient(to bottom, #FDF5E6, #FAEBD7);

  h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #0a3d62;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  .product-card-link {
    text-decoration: none;
    color: inherit;
  }

  .product-card {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 1rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }

    .product-image {
      width: 100%;
      height: 180px;
      object-fit: contain;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .product-name {
      font-size: 1.1rem;
      font-weight: 600;
      color: #333;
      text-align: center;
      margin: 0.5rem 0;
    }

    .product-price {
      font-size: 1rem;
      font-weight: 500;
      color: #27ae60;
      margin-bottom: 0.3rem;
    }

    .product-rating {
      font-size: 0.9rem;
      color: #f39c12;
    }
  }

  .pagination {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;

    button {
      padding: 0.5rem 1rem;
      border: none;
      background-color: #0a3d62;
      color: white;
      cursor: pointer;
      border-radius: 4px;
      font-weight: 500;

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }

    span {
      font-weight: 500;
      color: #333;
    }
  }
}
</style>