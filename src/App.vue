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
  padding: 0;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(to bottom, #6cc0a8 0%, #ffffff 100%);
  min-height: 100vh;
}
#app {
  width: 100%;
  display: block;

}

</style>
