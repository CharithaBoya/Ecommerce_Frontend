import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import CartPage from '../views/CartPage.vue'
import OrderHistory from '@/views/OrderHistory.vue'
import OrderSuccess from '../views/OrderSuccess.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
 
    {

    path: '/login', component: LoginPage },
      {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
  path: '/cart',
  name: 'Cart',
  component: CartPage
},
{
  path: '/order-history',
  name: 'OrderHistory',
  component: OrderHistory
},
{
  path: '/checkout-success',
  name: 'CheckoutSuccess',
  component: OrderSuccess
},


{
      path: "/category/:categoryName",
     name: "CategoryProducts",
     component: () => import("@/views/CategoryProducts.vue") // or wherever your file is
}

  ],

})

export default router
