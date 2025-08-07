<template>
  <div class="search-results">
    <h2>Search Results</h2>

    <div class="sort-buttons">
      <button @click="setSort('price')">Sort by Price</button>
      <button @click="setSort('rating')">Sort by Rating</button>
    </div>

    <div v-if="loading">Loading...</div>
    <div v-else-if="products.length === 0">No products found.</div>

    <div v-else class="product-grid">
      <router-link
        v-for="product in products"
        :key="product.productId"
        :to="`/product/${product.productId}`"
        class="product-card-link"
      >
        <div class="product-card">
          <img
            v-if="product.productImageUrl"
            :src="product.productImageUrl"
            :alt="product.productName"
            class="product-image"
          />
          <h3>{{ product.productName }}</h3>
          <p>₹{{ product.productPrice }}</p>
          <p>⭐ {{ product.productRating }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchResults',
  data() {
    return {
      searchTerm: '',
      products: [],
      loading: true,
      sortBy: '', 
      lastQuery: '',
    };
  },
  watch: {
    '$route.query.q': {
      immediate: true,
      handler(newQuery) {
        const cleanedQuery = newQuery?.trim() || '';

        if (cleanedQuery !== this.lastQuery) {
          this.sortBy = ''; 
        }

        this.lastQuery = cleanedQuery;
        this.searchTerm = cleanedQuery;

        this.fetchProducts();
      },
    },
  },
  methods: {
    async fetchProducts() {
      this.loading = true;

      if (!this.searchTerm.trim()) {
        this.products = [];
        this.loading = false;
        return;
      }

      try {
        let apiUrl = `http://10.20.6.241:8080/elasticsearch/search?name=${encodeURIComponent(this.searchTerm)}`;

        if (this.sortBy) {
          apiUrl += `&sortBy=${encodeURIComponent(this.sortBy)}`;
        }

         const response = await axios.get(apiUrl, {
    headers: {
      'x-Skip-Auth': 'false'
    }
  });

        this.products = response.data;
      } catch (error) {
        console.error('Search failed:', error);
        this.products = [];
      } finally {
        this.loading = false;
      }
    },

    setSort(option) {
      this.sortBy = option;
      this.fetchProducts();
    },
  },
};
</script>


<style scoped>
.search-results {
  padding: 2rem;
}

.sort-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.sort-buttons button {
  padding: 0.5rem 1rem;
  background-color: #0A1128;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.sort-buttons button:hover {
  background-color: #001f5c;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  justify-items: center;
}

.product-card-link {
  text-decoration: none;
  color: inherit;
  width: 100%;
  max-width: 250px;
  transition: transform 0.2s;
}

.product-card-link:hover {
  transform: translateY(-5px);
}

.product-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
}

.product-card h3 {
  font-size: 1rem;
  margin: 0.5rem 0;
  min-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.product-card p {
  margin: 0.25rem 0;
  font-size: 0.95rem;
  color: #555;
}
</style>