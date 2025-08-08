// import { defineStore } from 'pinia';

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     isLoggedIn: !!localStorage.getItem('jwt'),
//     customer: localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null,
//   }),
//   actions: {
//     login(token, userData) {
//       localStorage.setItem('jwt', token);
//       localStorage.setItem('customer', JSON.stringify(userData));
//       this.isLoggedIn = true;
//       this.customer = userData;
//     },
//     logout() {
//       localStorage.removeItem('jwt');
//       localStorage.removeItem('customer');
//       this.isLoggedIn = false;
//       this.customer = null;
//     },
//   }
// });


import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: !!localStorage.getItem('jwt'),
    customer: localStorage.getItem('customer') 
      ? JSON.parse(localStorage.getItem('customer')) 
      : null,
  }),
  getters: {
    getIsLoggedIn: (state) => state.isLoggedIn,
    getCustomer: (state) => state.customer
  },
  actions: {
    login(token, userData) {
      localStorage.setItem('jwt', token);
      localStorage.setItem('customer', JSON.stringify(userData));
      this.isLoggedIn = true;
      this.customer = userData;
    },
    logout() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('customer');
      this.isLoggedIn = false;
      this.customer = null;
    },
  }
});
