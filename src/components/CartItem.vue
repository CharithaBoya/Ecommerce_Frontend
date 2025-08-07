<template>
  <div class="cart-item">
    <img :src="item.productImageUrl" :alt="item.productName" class="product-image" />
    <h3 class="heading">{{ item.productName }}</h3>
    <p>Price: ₹{{ item.productPrice }}</p>
    <div class="quantity-control">
      <button @click="decreaseQty">−</button>
      <span>{{ localQty }}</span>
      <button @click="increaseQty">+</button>
    </div>

    <button @click="removeItem" class="remove-btn">Remove</button>
  </div>
  
</template>

<script>
  export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localQty: this.item.quantity || 1
    }
  },
  methods: {
     increaseQty() {
      this.localQty++
      this.emitQty()
    },
    decreaseQty() {
      if (this.localQty > 1) {
        this.localQty--
        this.emitQty()
      }
    },
    emitQty() {
      this.$emit('update-qty', {
        productId: this.item.productId,
        quantity: this.localQty
      })
    },
    removeItem() {
      this.$emit('remove', this.item.productId)
    }
  }
}
</script>


<style scoped>
.cart-item {
  display: flex;
  border: 1px solid #ccc;
  background-color: rgb(249, 253, 252);
  border-radius: 20px;
  padding: 1rem;
  margin: 1rem;
  gap: 1.5rem;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
}
.product-image {
  width: 120px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #ddd;
}

.heading {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
}

.quantity-control button {
  padding: 0.4rem 1rem;
  font-size: 1.2rem;
  background-color: #6cc0a8;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.quantity-control span {
  font-weight: bold;
  font-size: 1.2rem;
}

.remove-btn {
  padding: 0.5rem 1rem;
  background-color: #ff5c5c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
