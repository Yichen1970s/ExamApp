import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from '../stores/user'
import {info} from '../api/login'
import IndexView from '../views/Index.vue'
import LoginView from '../views/Login.vue'
import MyselfView from '../views/Myself.vue'
import ExamView from '../views/Exam.vue'
import MymarkView from '../views/Mymark.vue'
import ExamDetailView from '../views/ExamDetail.vue'
import ExamStartView from '../views/ExamStart.vue'
import ExamResultView from '../views/ExamResult.vue'
import ModifydataView from '../views/Modifydata.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '首页',
      component: IndexView,
      meta:{auth:true}
    },
    {
      path: '/login',
      name: '登录',
      component:LoginView,
      meta:{auth:false}
    },
    {
      path: '/myself',
      name: '我的',
      component:MyselfView,
      meta:{auth:true}
    },
    {
      path: '/exam',
      name: '考试',
      component:ExamView,
      meta:{auth:true}
    },
    {
      path: '/mymark',
      name: '我的成绩',
      component:MymarkView,
      meta:{auth:true}
    },
    {
      path: '/examdetail/:id?',
      name: '考试详情',
      component:ExamDetailView,
      meta:{auth:true}
    },
    {
      path: '/examstart/:id?',
      name: '正在考试',
      component:ExamStartView,
      meta:{auth:true}
    },
    {
      path: '/examresult/:id?',
      name: '结果详情',
      component:ExamResultView,
      meta:{auth:true}
    },
    {
      path: '/modifydata',
      name: '修改资料',
      component:ModifydataView,
      meta:{auth:true}
    }
  ]
})

router.beforeEach((to,from,next)=>{
  // console.log(to);
  if(to.meta.auth){//需要权限校验的
    //校验token是否合法,通过请求头携带
    const userStore=useUserStore()
    const token = userStore.token
    const userId=userStore.userId
    if(token){
      info({token:token}).then(res=>{
        if(res.data.code===0){
          userStore.updateUserId(res.data.data.id)
          userStore.updateUsername(res.data.data.userName)
          next()
        }else{
          alert('登陆已过期')
          next('login')
        }
      })
    }else{
      alert('还未登录,请先登录')
      next('login')
    }
  }else{
    next()//不需要权限直接进入
  }

})
export default router
