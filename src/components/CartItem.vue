<template>
  <div class="cart-item">
    <h3 class="heading">{{ item.productName }}</h3>
    <p>Price: ₹{{ item.productPrice }}</p>
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
  background-color: rgb(216, 234, 230);
  border-radius: 4%;
  padding: 1rem;
  margin: 1rem;
.heading{
   font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
  }
}
</style>
