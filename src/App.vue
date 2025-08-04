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
body {
  margin: 0;
  font-family: 'Roboto';
  background-color: #f8f9fa;
}

#app {
  width: 100%;
  display: block;

}

body {
  margin: 0;
  font-family: 'Roboto';
  background-color: #f8f9fa;
}
</style>
