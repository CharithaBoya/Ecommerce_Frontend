<script>
export default {
  name: 'Carousel',
  data() {
    return {
      currentIndex: 0,
images: [
  'https://i.ibb.co/sJjXGt5f/Gemini-Generated-Image-lvzmhylvzmhylvzm.png',
  'https://i.ibb.co/dJBvbQ6X/Gemini-Generated-Image-400y6a400y6a400y.png',
  'https://i.ibb.co/zW5L8bLL/Gemini-Generated-Image-oteifuoteifuotei.png'
]

    };
  },
  mounted() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000);
  }
};
</script>

<template>
  <div class="carousel-container">
    <div class="carousel" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div class="carousel-item" v-for="(image, index) in images" :key="index">
        <img :src="image" alt="Offer Banner" />
      </div>
    </div>
  </div>
</template>



<style scoped>
.carousel-container {
  width: 100vw;
  overflow: hidden;


  .carousel {
    display: flex;

    transition: transform 0.5s ease-in-out;

    .carousel-item {
      min-width: 100vw;

      img {
        height: 400px;
        object-fit: cover;
        display: block;
      }
    }
  }
}
</style>
