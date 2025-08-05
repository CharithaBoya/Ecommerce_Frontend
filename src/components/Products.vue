<template>
  <div class="products-wrapper">
    <h2>Featured Products</h2>

    <div v-if="loading">Loading products...</div>
    <div v-else class="product-grid">
      <router-link
        v-for="product in products"
        :key="product.sellerId + '-' + product.productId"
        :to="`/product/${product.productId}`"
        class="product-card-link"
      >
        <div class="product-card">
          <img
            v-if="product.productImageUrl"
            :src="product.productImageUrl"
            alt="Product Image"
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
import { getAllSellerProducts, getProductById } from "@/services/apiService";

export default {
  name: "Products",
  data() {
    return {
      products: [],
      loading: false,
    };
  },
  async created() {
    this.loading = true;
    try {
      const res = await getAllSellerProducts();
      const sellerProducts = res.data;

      // For each product, fetch its image using productId
      const productsWithImages = await Promise.all(
        sellerProducts.map(async (product) => {
          try {
            const imageRes = await getProductById(product.productId);
            product.productImageUrl = imageRes.data.productImageUrl;
          } catch (err) {
            console.error(`Failed to get image for productId ${product.productId}`, err);
            product.productImageUrl = null;
          }
          return product;
        })
      );

      this.products = productsWithImages;
    } catch (error) {
      console.error("Error fetching seller products:", error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.products-wrapper {
  padding: 2rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}

.product-card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.product-image {
  width: 100%;
  height: 160px;
  object-fit: contain;
  margin-bottom: 1rem;
}
</style>
