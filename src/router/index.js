import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/Index.vue'
import LoginView from '../views/Login.vue'
import MyselfView from '../views/Myself.vue'
import ExamView from '../views/Exam.vue'
import MymarkView from '../views/Mymark.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '首页',
      component: IndexView
    },
    {
      path: '/login',
      name: '登录',
      component:LoginView
    },
    {
      path: '/myself',
      name: '我的',
      component:MyselfView
    },
    {
      path: '/exam',
      name: '考试',
      component:ExamView
    },
    {
      path: '/mymark',
      name: '我的成绩',
      component:MymarkView
    }
  ]
})

export default router
