<script>
import ProductCard from "@/components/ProductCard.vue";
import { searchProductsByName } from "@/services/apiService";

export default {
  name: "SearchResults",
  components: {
    ProductCard,
  },
  data() {
    return {
      searchQuery: "",
      products: [],
      loading: false,
    };
  },
  watch: {
    '$route.query.q': {
      immediate: true,
      handler(newQuery) {
        this.searchQuery = newQuery;
        this.fetchSearchResults();
      }
    }
  },
  methods: {
    async fetchSearchResults() {
      if (!this.searchQuery) return;

      this.loading = true;
      try {
        const res = await searchProductsByName(this.searchQuery);
        this.products = res.data;
      } catch (err) {
        console.error("Search failed:", err);
        this.products = [];
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>


<template>
  <div class="search-results">
    <h2>Search Results for "{{ searchQuery }}"</h2>

    <div v-if="loading">Loading...</div>
    <div v-else-if="products.length === 0">
      <p>No products found.</p>
    </div>
    <div class="product-grid" v-else>
      <ProductCard
        v-for="product in products"
        :key="product.productId"
        :product="product"
      />
    </div>
  </div>
</template>



<style scoped>
.search-results {
  padding: 2rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}
</style>
