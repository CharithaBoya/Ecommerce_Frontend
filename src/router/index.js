import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
 
    {
      path: "/category/:categoryName",
     name: "CategoryProducts",
     component: () => import("@/views/CategoryProducts.vue") // or wherever your file is
}

  ],
})

export default router
