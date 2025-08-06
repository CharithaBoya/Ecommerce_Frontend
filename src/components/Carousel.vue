<script>
export default {
  name: 'Carousel',
  data() {
    return {
      currentIndex: 0,
      timer: null,
      transitioning: true,
      images: [
        'https://i.ibb.co/v6DZvNr6/Gemini-Generated-Image-g0exdmg0exdmg0ex.png',
        'https://i.ibb.co/vxPKcDkD/Gemini-Generated-Image-8oobph8oobph8oob.png',
        'https://i.ibb.co/q3X8D0Sc/Gemini-Generated-Image-l2vdy8l2vdy8l2vd.png',
        'https://i.ibb.co/BWDTVzs/Gemini-Generated-Image-l2vdy8l2vdy8l2vd-1.png',
        'https://i.ibb.co/XcqwHzX/Whats-App-Image-2025-08-04-at-12-33-28-PM.jpg',
        'https://i.ibb.co/TqdvYQMZ/Whats-App-Image-2025-08-04-at-12-34-49-PM.jpg'
      ]
    };
  },
  computed: {
    carouselImages() {
      return [...this.images, this.images[0]];
    }
  },
  mounted() {
    this.startAutoSlide();
  },
  methods: {
    startAutoSlide() {
      this.timer = setInterval(() => {
        this.transitioning = true;
        this.currentIndex++;
      }, 3000);
    },
    handleTransitionEnd() {
      if (this.currentIndex === this.images.length) {
        this.transitioning = false;
        this.currentIndex = 0;
      }
    }
  },

};
</script>


<template>
  <div class="carousel-container">
    <div
      class="carousel"
      :class="{ 'no-transition': !transitioning }"
      :style="{ transform: `translateX(-${currentIndex * 100}%) `}"
      @transitionend="handleTransitionEnd"
    >
      <div class="carousel-item" v-for="(image, index) in carouselImages" :key="index">
        <img :src="image" alt="Offer Banner" />
      </div>
    </div>
  </div>
</template>



<style scoped>
.carousel-container {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  /* border-radius: 12px; */
  position: relative;
  /* box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); */
}

.carousel {
  display: flex;
  transition: transform 0.8s ease-in-out;
  &.no-transition {
    transition: none;
  }
}

.carousel-item {
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  /* background-color: #f4f4f4; */


  img {
    width: 100%;
    height: 400px;
    object-fit: contain;
    display: block;
    border-radius: 12px;
  }
}


</style>