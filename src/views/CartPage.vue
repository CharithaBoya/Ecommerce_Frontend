<template>
  <div class="cart-page">
    <h1 class="heading">Your Cart</h1>

    <div v-if="!isLoggedIn" class="login-prompt">
      <p>Please log in to view your cart.</p>
      <button @click="goToLogin">Login to Start Shopping</button>
    </div>

    <div v-else-if="cartItems.length === 0">
      Your cart is empty.
    </div>

    <CartItem
      v-for="item in cartItems"
      :key="item.productId"
      :item="item"
      @update-qty="updateQuantity"
      @remove="removeItem"
    />

    <div class="total-section" v-if="cartItems.length > 0">
      <p>Total: ₹{{ totalAmount }}</p>
      <button @click="checkout" 
    :disabled="hasOutOfStockItem"
  >Checkout</button>
    </div>
  </div>
</template>

<script>
import CartItem from '../components/CartItem.vue'
import { useAuthStore } from '../stores/authStore'
import {
  getCartItems,
  placeOrder,
  deleteCartItem,
  updateCartQuantity,
  updateStockAfterOrder
} from '@/services/apiServices'

export default {
  name: 'CartPage',
  components: {
    CartItem
  },
  data() {
    return {
      cartItems: [],
      isLoggedIn: false
    }
  },
  computed: {
    totalAmount() {
      return this.cartItems.reduce((sum, item) => {
        return sum + (item.productPrice || 0) * (item.quantity || 1)
      }, 0)
    },
  
  },
  methods: {
    goToLogin() {
      this.$router.push({ path: '/login', query: { redirect: '/cart' } })
    },

    async fetchCartData() {
      try {
        const auth = useAuthStore()
        const customerId = auth.customer?.customerId

        if (!customerId) return

        const response = await getCartItems(customerId)
        this.cartItems = response.data.items
      } catch (error) {
        console.error('Failed to fetch cart items:', error)
      }
    },

    async updateQuantity({ productId, quantity }) {
      const item = this.cartItems.find(i => i.productId === productId)
      if (!item) return

      item.quantity = quantity

      const auth = useAuthStore()
      const customerId = auth.customer?.customerId
      if (!customerId) return

      try {
        await updateCartQuantity({ customerId, productId, quantity })
        console.log(`Updated quantity of product `)
      } catch (error) {
        console.error('Failed to update quantity:', error)
      }
    },

    async removeItem(productId) {
      try {
        const auth = useAuthStore()
        const customerId = auth.customer?.customerId
        if (!customerId) return

        await deleteCartItem(customerId, productId)
        this.cartItems = this.cartItems.filter(item => item.productId !== productId)
        console.log(`Product ${productId} removed from cart.`)
      } catch (error) {
        console.error('Error removing item from cart:', error)
        alert('Failed to remove item from cart.')
      }
    },

    async checkout() {
      const auth = useAuthStore()
      const customerId = auth.customer?.customerId
      if (!customerId) {
        alert('Customer not logged in.')
        return
      }

      if (this.cartItems.length === 0) {
        alert('Cart is empty.')
        return
      }
      if (this.hasOutOfStockItem) {
        alert('One or more items in your cart do not have enough stock. Please update your cart.')
        return
      }
      try {
      
        const stockUpdatePayload = this.cartItems.map(item => ({
          productId: item.productId,
          sellerId: item.sellerId,
          quantity: item.quantity
        }))

        const stockUpdateResponse = await updateStockAfterOrder(stockUpdatePayload)
        console.log(stockUpdateResponse.data)
        if (stockUpdateResponse.data==="successful") {
          this.$router.push('/checkout-success')
          await placeOrder(customerId)
        } else {
          alert(stockUpdateResponse.data)
        }

      } catch (err) {
        console.error('Checkout failed:', err)
        alert('Failed to place order.')
      }
    }
  },
  mounted() {
    const auth = useAuthStore()
    const customerId = auth.customer?.customerId
    this.isLoggedIn = !!customerId

    if (this.isLoggedIn) {
      this.fetchCartData()
    }
  }
}
</script>

<style scoped>
.cart-page {
  max-width: 880px;
  padding: 2rem;
  margin: 2rem auto;
}

.heading {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
}

.total-section {
  margin-top: 2rem;
  text-align: right;
}

button {
  padding: 0.6rem 1.2rem;
  background-color: #6cc0a8;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
