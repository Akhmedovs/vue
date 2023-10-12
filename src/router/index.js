import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import Cart from '@/views/Cart.vue'
import Like from '@/views/Like.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/product/:id',
      name: 'product',
      component: ProductView,
      props: true
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/like',
      name: 'like',
      component: Like
    }
  ]
})

export default router
