// src/stores/authStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(!!localStorage.getItem('jwt')); // true if token exists

  function login(token) {
    localStorage.setItem('jwt', token);
    isLoggedIn.value = true;
  }

  function logout() {
    localStorage.removeItem('jwt');
    isLoggedIn.value = false;
  }

  return { isLoggedIn, login, logout };
});
