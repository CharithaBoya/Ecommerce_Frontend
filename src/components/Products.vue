<script>
import axios from 'axios';

export default {
  name: "Products",
  data() {
    return {
      products: []
    };
  },
  async mounted() {
    try {
      const sellerProducts = await getAllSellerProducts();

      const productsWithImages = await Promise.all(
        sellerProducts.map(async (product) => {
          try {
            const productDetails = await fetchProductById(product.productId);
            return {
              ...product,
              productImageUrl: productDetails.productImageUrl,
            };
          } catch (error) {
            console.error("Failed to fetch product details:", error);
            return product;
          }
        })
      );

      this.products = productsWithImages;
    } catch (error) {
      console.error("Failed to fetch seller products:", error);
    }
  }

};
</script>

<template>
  <section>
    <div class="products">
      <h2 class="products-title">Products</h2>
      <div class="products__grid">
        <div class="product-card" v-for="(product, index) in products" :key="index">
          <img :src="product.image" :alt="product.name" class="product-card__image" />
          <h3 class="product-card__name">{{ product.name }}</h3>
          <p class="product-card__price">₹{{ product.price }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products {
  padding: 2rem;
}

.products-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.products__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.product-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  text-align: center;
  background-color: #fff;
  transition: box-shadow 0.3s;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.product-card__name {
  font-size: 1.1rem;
  margin: 0.8rem 0 0.4rem;
}

.product-card__price {
  color: #27ae60;
  font-weight: bold;
  margin-bottom: 0.8rem;
}
</style>
