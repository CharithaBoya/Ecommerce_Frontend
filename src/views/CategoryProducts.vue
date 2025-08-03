<template>
  <div>
    <h2>Products in {{ categoryName }} Category</h2>
    <div v-if="products.length">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="product-card"
      >
        <h3>{{ product.productName }}</h3>
        <p>{{ product.productDescription }}</p>
        <p>Price: ₹{{ product.productPrice }}</p>
      </div>
    </div>
    <p v-else>No products found.</p>
  </div>
</template>

<script>
export default {
  name: "CategoryProducts",
  data() {
    return {
      categoryName: this.$route.params.categoryName,
      products: [] // will be filtered dummy data for now
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      // Dummy data simulating a response from backend
      const dummySellerProducts = [
        {
          productId: 1,
          productName: "Nike Shoes",
          productDescription: "High quality running shoes",
          productCategory: "Fashion",
          productPrice: 2500
        },
        {
          productId: 2,
          productName: "Smartphone",
          productDescription: "Latest model with great features",
          productCategory: "Electronics",
          productPrice: 18000
        },
        {
          productId: 3,
          productName: "Yoga Mat",
          productDescription: "Non-slip mat for fitness routines",
          productCategory: "Fitness",
          productPrice: 800
        }
      ];

      this.products = dummySellerProducts.filter(
        product =>
          product.productCategory.toLowerCase() ===
          this.categoryName.toLowerCase()
      );
    }
  }
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
