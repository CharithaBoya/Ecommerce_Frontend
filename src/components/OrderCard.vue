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

    <h4 class="order-date">
  Ordered Date: {{ formattedDate }} <br />
  Ordered Time: {{ formattedTime }}
</h4>

<ul class="items-list">
  <li v-for="item in order.items" :key="item.productId" class="item-entry">
    {{ item.productName }} — Qty: {{ item.quantity }} @ ₹{{ item.productPrice }}
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
    const date = new Date(this.order.orderDate);
    return date.toLocaleDateString(); // e.g. 08/07/2025
  },
  formattedTime() {
    const date = new Date(this.order.orderDate);
    return date.toLocaleTimeString(); // e.g. 10:45:12 AM
  }
},
  async created() {
    try {
      const productResponse = await fetchProductById(this.order.productId);
      this.product = productResponse.data;
      console.log(this.order)

      const sellerResponse = await getSellerNameById(this.order.sellerId);
      this.seller = sellerResponse.data;
    } catch (error) {
      console.error("Error fetching product or seller:", error);
    }
  },
};
</script>
<style>
.order-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  background-color: rgb(255, 251, 251);
  margin: 1rem auto;
  max-width: 600px;
}

.order-id {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.product-details {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

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

.seller-details {
  margin-bottom: 1rem;
}

.seller-name {
  font-weight: bold;
}

.seller-email,
.seller-phone {
  font-size: 0.9rem;
}

.order-date {
  font-style: italic;
  margin-bottom: 1rem;
  color: #444;
}

.items-list {
  list-style-type: none; 
  padding-left: 0;
}

.item-entry {
  margin-bottom: 20px;
  padding: 4px 0;
  border-bottom: 1px solid #ccc;
}
</style>