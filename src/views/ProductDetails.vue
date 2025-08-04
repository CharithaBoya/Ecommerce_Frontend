<template>
<div class="product-details-container">
    <div class="product-header">
      <img :src="product.imageUrl" alt="Product Image" class="product-image" />
      <div class="product-info">
        <h2 class="product-title">{{ product.productName }}</h2>
          <p class="product-description">{{ product.productDescription }}</p>

        <p class="category"><strong>Brand:</strong> {{ product.productBrand }}</p>

        <p class="rating">Rating: {{ selectedSeller?.productRating }} ★</p>

        <div class="seller-dropdown">
          <label for="sellerSelect"><strong>Choose Seller:</strong></label>
          <select id="sellerSelect" v-model="selectedSellerId" @change="updateSellerInfo">
            <option v-for="seller in sellers" :key="seller.sellerId" :value="seller.sellerId">
                {{ sellerNames[seller.sellerId] || 'Loading...'}} - ₹{{ seller.productPrice }} ({{ seller.productQuantity}} in stock)

        </option>
          </select>
        </div>

        <div class="price">
          Selected Price: ₹
          {{
            selectedSeller
              ? selectedSeller.productPrice
              : 'Select a seller'
          }}
        </div>

         <button @click="handleAddToCart">Add to Cart</button>

      </div>
    </div>
  </div>
</template>

<script>
import { fetchProductById, getSellerById, getSellerIdsForProduct ,getSellerNameById} from '../services/apiServices'
import { mapActions,mapGetters } from 'pinia'
import { useCartStore } from '../stores/cartStore'
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'ProductDetail',
  
  data() {
    return {
      product: null,
      sellers: [],
      sellerNames: {},
      selectedSellerId: null,
      selectedSeller: null
    }
  },
    computed: {
    ...mapGetters(useAuthStore, ['customerId'])
  },

  created() {
    const productId = this.$route.params.productId
    this.fetchProduct(productId)
   this.fetchProductSellers(productId)
  },
  methods: {
     ...mapActions(useCartStore, ['addToCart']),
     
    async fetchProduct(productId) {
      try {
        const response = await fetchProductById(productId)
        this.product = response.data
      } catch (err) {
        console.error('Error fetching product', err)
      }
    },
    
    async fetchProductSellers(productId) {
      try {
        const { data: sellerIds } = await getSellerIdsForProduct(productId)

        const sellerPromises = sellerIds.map((sellerId) =>
          getSellerById(productId, sellerId)
        )

        const responses = await Promise.all(sellerPromises)
        this.sellers = responses.map(res => res.data)
        const namePromises = this.sellers.map(seller =>
      getSellerNameById(seller.sellerId)
    );

    const nameResponses = await Promise.all(namePromises);

    nameResponses.forEach((res, index) => {
      const sellerId = this.sellers[index].sellerId;
      this.sellerNames[sellerId] = res.sellerName || "Unknown";
    });
        if (this.sellers.length) {
          this.selectedSellerId = this.sellers[0].sellerId
          this.selectedSeller = this.sellers[0]
        }
      } catch (err) {
        console.error('Error fetching sellers:', err)
      }
    },


    updateSellerInfo() {
      this.selectedSeller = this.sellers.find(
        s => s.sellerId === this.selectedSellerId
      )
    },


    handleAddToCart() {
    if (!this.customerId || !this.product || !this.selectedSeller) return;

      const cartItem = {
        // customerId: this.customerId,
        productId: this.product.productId,
        productName: this.product.productName,
        quantity: 1,
        productPrice: this.selectedSeller.productPrice,
        sellerId: this.selectedSeller.sellerId
      };

      this.addToCart(cartItem)
  .then(() => {
    alert("Item added to cart!");
    this.$router.push('/cart');
  })
  .catch((err) => {
    console.error("Add to cart failed", err);
    alert("Something went wrong.");
  });
    }
  },
    
  
    updateSellerInfo() {
      this.selectedSeller = this.sellers.find(s => s.sellerId === this.selectedSellerId)
    },
}
  

</script>

<style scoped >
.product-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
  background: #f9fafb;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.product-header {
  display: flex;
  gap: 2rem;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
}

.product-image {
  width: 100%;
  max-width: 350px;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1f2937;
}

.product-description {
  font-size: 1rem;
  color: #4b5563;
}

.category,
.rating,
.price {
  font-size: 1rem;
  color: #374151;
}

.rating {
  color: #f59e0b;
  font-weight: 500;
}

.price {
  font-size: 1.3rem;
  font-weight: 600;
  color: #16a34a;
}

.seller-dropdown {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.seller-dropdown select {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  background: #fff;
  max-width: 300px;
}

button {
  margin-top: 1.2rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background: #3b82f6;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

button:hover {
  background: #2563eb;
}

@media (max-width: 768px) {
  .product-header {
    flex-direction: column;
    align-items: center;
  }

  .product-info {
    text-align: center;
    align-items: center;
  }

  .seller-dropdown select {
    width: 100%;
  }
}
</style>
