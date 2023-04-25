import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/Index.vue'
import LoginView from '../views/Login.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView
    },
    {
      path: '/login',
      name: 'about',
      component:LoginView
    }
  ]
})

export default router
