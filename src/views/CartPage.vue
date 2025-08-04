<template>
  <div class="cart-page">
    <h1>Your Cart</h1>
    <CartItem
      v-for="item in cartItems"
      :key="item.productId"
      :item="item"
      @update-qty="updateQuantity"
      @remove="removeItem"
    />
    <div v-if="cartItems.length === 0">Your cart is empty.</div>
  </div>
    <button @click="checkout">Checkout</button>

</template>

<script>
import { useCartStore } from '../stores/cartStore'
import CartItem from '../components/CartItem.vue'
import { useOrderStore } from '@/stores/orderStore'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'CartPage',
  components: {
    CartItem
  },
  computed: {
    ...mapState(useCartStore, ['items']),
    cartItems() {
      return this.items
    },
    totalAmount() {
      return this.items.reduce(function (sum, item) {
        return sum + item.price * (item.quantity || 1)
      }, 0)
    }
  },
  methods: {
    ...mapActions(useCartStore, ['removeFromCart', 'updateCartQuantity', 'clearCart','addToCart']),
    ...mapActions(useOrderStore, ['placeOrder']),

    removeItem(productId) {
      this.removeFromCart(productId)
    },

    updateQuantity({ productId, quantity }) {
      this.updateCartQuantity({ productId, quantity })
    },

    checkout() {
      if (this.items.length > 0) {
        this.placeOrder(this.items)
        this.clearCart()
        this.$router.push('/checkout-success')
      }
    }
  }

}
</script>

<style scoped>
.cart-page {
  padding: 2rem;
}
</style>
