<script>
export default {
  name: 'Carousel',
  data() {
    return {
      currentIndex: 0,
      timer: null,
      transitioning: true,
      images: [
        'https://i.ibb.co/sJjXGt5f/Gemini-Generated-Image-lvzmhylvzmhylvzm.png',
        'https://i.ibb.co/dJBvbQ6X/Gemini-Generated-Image-400y6a400y6a400y.png',
        'https://i.ibb.co/zW5L8bLL/Gemini-Generated-Image-oteifuoteifuotei.png'
      ]
    };
  },
  computed: {
    carouselImages() {
      // Clone first image at end
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
      // If we're at the clone (last item), snap to the real first image
      if (this.currentIndex === this.images.length) {
        this.transitioning = false;
        this.currentIndex = 0;
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>


<template>
  <div class="carousel-container">
    <div
      class="carousel"
      :class="{ 'no-transition': !transitioning }"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
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
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.carousel {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
}

.carousel.no-transition {
  transition: none !important;
}

.carousel-item {
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-item img {
  height: 400px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}
</style>

