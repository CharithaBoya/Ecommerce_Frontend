import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    customer: null 
  }),
  actions: {
    login(user) {
      this.customer = user;
    },
    logout() {
      this.customer = null;
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.customer,
    customerId: (state) => state.customer?.customerId
  }
});