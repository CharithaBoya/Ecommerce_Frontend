
<script>
export default {
  name: "Products",
  data() {
    return {
      products: [
        {
          name: "Wireless Headphones",
          price: 1999,
          image: "https://via.placeholder.com/200x200?text=Headphones"
        },
        {
          name: "Smart Watch",
          price: 2999,
          image: "https://via.placeholder.com/200x200?text=Smart+Watch"
        },
        {
          name: "Gaming Mouse",
          price: 1499,
          image: "https://via.placeholder.com/200x200?text=Gaming+Mouse"
        },
        {
          name: "Bluetooth Speaker",
          price: 2499,
          image: "https://via.placeholder.com/200x200?text=Speaker"
        }
      ]
    };
  }
};
</script>
<template>
    <section>
        <div class="products">
    <h2 class="products-title"> Products</h2>

      <div class="product-card" v-for="(product, index) in products" :key="index">

        <img :src="product.image" :alt="product.name" class="product-card-image" />
        <h3 class="product-card__name">{{ product.name }}</h3>
        <p class="product-card__price">₹{{ product.price }}</p>

      </div>
    
  </div>
    </section>
</template>


<style scoped lang="scss">
.products {
  padding: 2rem;

  &__title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  &__grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

.product-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  text-align: center;
  background-color: #fff;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }

  &__name {
    font-size: 1.1rem;
    margin: 0.8rem 0 0.4rem;
  }

  &__price {
    color: #27ae60;
    font-weight: bold;
    margin-bottom: 0.8rem;
  }

  &__btn {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    border: none;
    color: #fff;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
