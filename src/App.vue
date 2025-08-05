<script>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
export default {
  components: {
    Navbar,
  },
};
</script>

<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(to bottom, #6cc0a8 0%, #ffffff 100%);
}


</style>
