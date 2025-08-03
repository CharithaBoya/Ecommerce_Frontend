<script>
import { RouterLink, RouterView } from 'vue-router'
<<<<<<< HEAD
</script>

<template>
  <header>
    
  </header>

  <RouterView />
=======
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
>>>>>>> d68967e (head and nav, search)
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
  font-family:'Roboto';
  background-color: #f8f9fa;
}
</style>

