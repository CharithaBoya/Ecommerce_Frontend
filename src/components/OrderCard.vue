<template>
  <div class="order-card">
    <h3 class="order-id">Order #{{ order.orderId }}</h3>

    <div v-if="product" class="product-details">
      <img :src="product.productImageUrl" :alt="product.productName" class="product-image" />
      <h4 class="product-name">Product: {{ product.productName }}</h4>
      <p class="product-price">Price: ₹{{ product.productPrice }}</p>
    </div>

    <div v-if="seller" class="seller-details">
      <h4 class="seller-name">Seller: {{ seller.sellerName }}</h4>
      <p class="seller-email">Email: {{ seller.email }}</p>
      <p class="seller-phone">Phone: {{ seller.phone }}</p>
    </div>

    <h4 class="order-date">Ordered Date: {{ formattedDate }}</h4>

    <ul class="items-list">
      <li v-for="item in order.items" :key="item.productId" class="item-entry">
        {{ item.productName }} - Qty: {{ item.quantity }} @ ₹{{ item.productPrice }}
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchProductById, getSellerNameById } from "../services/apiServices";

export default {
  name: "OrderCard",
  props: {
    order: Object,
  },
  data() {
    return {
      product: null,
      seller: null,
    };
  },
  computed: {
    formattedDate() {
      return new Date(this.order.orderDate).toLocaleDateString();
    },
  },
  async created() {
    try {
      const productResponse = await fetchProductById(this.order.item.productId);
      this.product = productResponse.data;

      const sellerResponse = await getSellerNameById(this.order.item.sellerId);
      this.seller = sellerResponse.data;
    } catch (error) {
      console.error("Error fetching product or seller:", error);
    }
  },
};
</script>

<style scoped>
.order-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  background-color: rgb(216, 234, 230);
  margin: 1rem auto;
  max-width: 600px;

  .order-id {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .product-details {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    .product-image {
      width: 100px;
      height: auto;
      margin-right: 1rem;
      border-radius: 4px;
    }

    .product-name,
    .product-price {
      font-size: 1rem;
    }
  }

  .seller-details {
    margin-bottom: 1rem;

    .seller-name {
      font-weight: bold;
    }

    .seller-email,
    .seller-phone {
      font-size: 0.9rem;
    }
  }

  .order-date {
    font-style: italic;
    margin-bottom: 1rem;
  }

  .items-list {
    padding-left: 1.5rem;

    .item-entry {
      margin-bottom: 0.3rem;
    }
  }
}
</style>
