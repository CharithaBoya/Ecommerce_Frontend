import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import CartPage from '../views/CartPage.vue'
import OrderHistory from '@/views/OrderHistory.vue'
import OrderSuccess from '../views/OrderSuccess.vue'
import UserDetails from '../views/UserDetails.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
 
    {
    path: '/product/:productId',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetails.vue'),

      
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
      path: "/category/:categoryId",
     name: "CategoryProducts",
     component: () => import("@/views/CategoryProducts.vue") 
},


{
  path: '/user-details',
  name: 'UserDetails',
  component: UserDetails
}



],
})

export default router
