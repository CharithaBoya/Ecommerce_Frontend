<template>
  <div class="cart-item">
    <h3>{{ item.productName }}</h3>
    <p>Price: ₹{{ item.price }}</p>
    <p>Quantity:
      <input type="number" v-model.number="localQty" min="1" @change="updateQty" />
    </p>
    <button @click="removeItem">Remove</button>
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
    updateQty() {
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
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem 0;
}
</style>
