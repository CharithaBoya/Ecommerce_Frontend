<template>
  <div>
    <Carousel />
    <Categories />
    <Products />



  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'
import Categories from '@/components/Categories.vue'
import Products from '@/components/Products.vue';


export default {
  components: {
    Carousel,
    Categories,
    Products
  }
}
</script>

