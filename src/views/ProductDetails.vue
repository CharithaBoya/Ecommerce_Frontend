<!-- <template>
  <div class="product-details-container">
    <div class="product-header">
      <img :src="product.productImageUrl" alt="Product Image" class="product-image" />
      <div class="product-info">
        <h2 class="product-title">{{ product.productName }}</h2>
        <p class="product-description">{{ product.productDescription }}</p>
        <p class="category"><strong>Brand:</strong> {{ product.productBrand }}</p>
        <p class="rating">Rating: {{ selectedSeller && selectedSeller.productRating }} ★</p>
        <div class="seller-dropdown">
          <label for="sellerSelect"><strong>Choose Seller:</strong></label>
          <select id="sellerSelect" v-model="selectedSellerId" @change="updateSellerInfo">
            <option v-for="seller in sellerNames" >
              {{ seller || 'Loading...' }} 
            </option>
          </select>
        </div>

        <div class="price">
          Selected Price: ₹
          {{ selectedSeller ? selectedSeller.productPrice : 'Select a seller' }}
        </div>

        <button @click="handleAddToCart">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  fetchProductById,
  getSellerIdsForProduct,
  getSellerNameById
} from '../services/apiServices';

import { useAuthStore } from '@/stores/authStore';
import { mapState } from 'pinia';
import { postCartItem } from '../services/apiServices';

export default {
  name: 'ProductDetail',

  data() {
    return {
      product: null,
      sellers: [],
      sellerNames: [],
      selectedSellerId: null,
      selectedSeller: null,
    };
  },

  computed: {
    ...mapState(useAuthStore, ['isLoggedIn', 'customer']),

    customerId() {
      return this.customer?.customerId;
    }
  },

  created() {
    const productId = this.$route.params.productId;
    this.fetchProduct(productId);
    this.fetchProductSellers(productId);
  },

  methods: {

    async fetchProduct(productId) {
      try {
        const response = await fetchProductById(productId);
        this.product = response.data;
        console.log(this.product);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    },
    async fetchProductSellers(productId) {
  try {
    const { data: sellerIds } = await getSellerIdsForProduct(productId); 
    

    const namePromises = sellerIds.map(sellerId => getSellerNameById(sellerId));
    const nameResponses = await Promise.all(namePromises);
    console.log(nameResponses);
    nameResponses.forEach((res, index) => {
      const sellerId = sellerIds[index];
      this.sellerNames[sellerId] = res.sellerName || 'Unknown';
      console.log(this.sellerNames,"sellerNames");
    });
    
    if (sellerIds.length) {
      this.selectedSellerId = sellerIds[0];
      this.selectedSeller = {
        sellerId: sellerIds[0],
        sellerName: this.sellerNames[sellerIds[0]]
      };
    }
  } catch (err) {
    console.error('Error fetching sellers:', err);
  }
},
    updateSellerInfo() {
  this.selectedSeller = this.sellers.find(s => s.sellerId === this.selectedSellerId);
},

    async handleAddToCart() {
      if (!this.isLoggedIn || !this.customerId) {
        alert("Please log in to add items to your cart.");
        this.$router.push({ path: '/login', query: { redirect: currentRoute } });
        return;
      }

      if (!this.product || !this.selectedSeller) {
        alert("Product or seller not selected.");
        return;
      }

      const cartItem = {
        customerId: this.customer.customerId,
        customerEmail: this.customer.customerEmail,
        productId: this.$route.params.productId,
        productName: this.product.productName,
        quantity: 1,
        productPrice: this.selectedSeller.productPrice,
        sellerId: this.selectedSeller.sellerId,
      };

      try {
        await postCartItem(cartItem);
        alert('Item added to cart!');
        this.$router.push('/cart');
      } catch (err) {
        console.error('Add to cart failed:', err);
        alert('Failed to add item to cart.');
      }
    }
  }
};
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
</style> -->


<template>
  <div class="product-details-container">
    <div class="product-header">
      <img :src="product.productImageUrl" alt="Product Image" @error="handleImageError" class="product-image" />
      <div class="product-info">
        <h2 class="product-title">{{ product.productName }}</h2>
        <p class="product-description">{{ product.productDescription }}</p>
        <p class="category"><strong>Brand:</strong> {{ product.productBrand }}</p>
        <!-- {{ sellers }} -->
        <p class="rating">Rating: {{ selectedSeller?.productRating }} ★</p>
        <label for="sellerSelect"><strong>Choose Seller:</strong></label>
        <div class="seller-dropdown">
          <select id="sellerSelect" v-model="selectedSellerId" @change="updateSellerInfo">
            <option
              v-for="seller in sellers"
              :key="seller.sellerId"
              :value="seller.sellerId"
            >
              {{seller.sellerName || 'Loading...' }} - ₹{{ seller.productPrice }} ({{ seller.productQuantity }} in stock)
            </option>
          </select>
        </div>

        <div class="price">
  <template v-if="selectedSeller">
    <div>
      Selected Price: ₹{{ selectedSeller.productPrice }}
    </div>
    <div v-if="selectedSeller.productQuantity <= 0" style="color: red; font-weight: bold;">
      Out of Stock
    </div>
    <div v-else>
      In Stock: {{ selectedSeller.productQuantity }}
    </div>
  </template>
</div>

<button 
  @click="handleAddToCart"
  :disabled="!selectedSeller || selectedSeller.productQuantity <= 0"
>
  Add to Cart
</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  fetchProductById,
  getSellerIdsForProduct,
  getSellerNameById
} from '../services/apiServices';

import { useAuthStore } from '@/stores/authStore';
import { mapState } from 'pinia';
import { postCartItem } from '../services/apiServices';
import defaultImage from '@/assets/default-product.avif'
import { useToast } from 'vue-toastification'
export default {
  name: 'ProductDetail',

  data() {
    return {
      product: null,
      sellers: [],
      sellerNames: {},
      selectedSellerId: null,
      // selectedSellerId: "Choose Seller",
      selectedSeller: null,
    };
  },

  computed: {
    ...mapState(useAuthStore, ['isLoggedIn', 'customer']),

    customerId() {
      return this.customer?.customerId;
    }
  },

  created() {
    const productId = this.$route.params.productId;
    this.fetchProduct(productId);
    this.fetchProductSellers(productId);
  },

  methods: {
    handleImageError(event) {
      event.target.src = defaultImage
    },

    async fetchProduct(productId) {
      try {
        const response = await fetchProductById(productId);
        this.product = response.data;
        console.log(this.product);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    },

    async fetchProductSellers(productId) {
      try {
        const { data: sellerList } = await getSellerIdsForProduct(productId);
        this.sellers = sellerList;
      if (this.sellers.length > 0) {
      this.selectedSellerId = this.sellers[0].sellerId;
      this.selectedSeller = this.sellers[0];
    }
      } catch (err) {
        console.error("Error fetching sellers:", err);
      }
    },

    updateSellerInfo() {
      // this.selectedSeller = this.sellers.find(
      //   s => s.sellerId === this.selectedSellerId

      this.selectedSeller = this.sellers.find(
        (seller) => seller.sellerId === this.selectedSellerId

      );
      console.log(this.selectedSellerId);
      
    },

    async handleAddToCart() {
       const toast = useToast()

      if (!this.isLoggedIn || !this.customerId) {
        const id=this.product.id
        toast.error("Please log in to add items to your cart.");
        this.$router.push({ 
         path: '/login', 
         query: { redirect: `/product/${id}` } 
        });
      }
      if (!this.product || !this.selectedSeller) {
       toast.error("Product or seller not selected.");
       return;
      }

      
      const cartItem = {
        customerId: this.customer.customerId,
        customerEmail: this.customer.customerEmail,
        productId: this.$route.params.productId,
        productName: this.product.productName,
        productImageUrl:this.product.productImageUrl,
        quantity: 1,
        productPrice: this.selectedSeller.productPrice,
        sellerId: this.selectedSeller.sellerId,
      };

      try {
        await postCartItem(cartItem);
        toast.success('item added to cart.')
        this.$router.push('/cart');
      } catch (err) {
        console.error('Add to cart failed:', err);
        toast.error('Failed to add item to cart.');
      }
    }
  },

};
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
  height: 500px; 
  object-fit: contain; 
  border-radius: 1rem;
  box-shadow: 4px 10px rgba(0, 0, 0, 0.08);
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
button:disabled {
  background: #9ca3af; 
  cursor: not-allowed;
  opacity: 0.7;
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