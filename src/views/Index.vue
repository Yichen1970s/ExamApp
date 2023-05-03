<template>
  <div>
    <van-nav-bar title="Exam_MS考试系统" />
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="content">
        <van-grid :gutter="10" :column-num="2" >
      <van-grid-item @click="handleToExam">
        <van-icon name="description" color="#1989fa" size="30"/>
        <van-text>在线考试</van-text>
    </van-grid-item>
      <van-grid-item @click="handleToMymark">
        <van-icon name="chart-trending-o" color="red" size="30"/>
        <van-text>我的成绩</van-text>
    </van-grid-item>

    <van-grid-item  v-for="item in icons" :key="index" @click="handleClickNotDevelopment">
      <van-icon :name="item.icon" :color="item.color" size="30"/>
        <van-text>{{item.text}}</van-text>
    </van-grid-item>
    </van-grid>
    </div>
    <Footer :active="0"></Footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Footer from '../components/Footer.vue'
import { showDialog } from 'vant'
import { useRouter } from 'vue-router';
import {useUserStore} from '../stores/user'


const router =useRouter()
const images = [
  'http://127.0.0.1:5173/src/assets/image/01.jpg',
  'http://127.0.0.1:5173/src/assets/image/02.jpg',
  'http://127.0.0.1:5173/src/assets/image/03.jpg',
  'http://127.0.0.1:5173/src/assets/image/04.jpg'
]
const icons=[
    {text:'课程学习',icon:'edit',color:"green"},
    {text:'题库训练',icon:'audio',color:"blue"},
    {text:'知识竞赛',icon:'comment-circle-o',color:"purple"},
    {text:'积分商城',icon:'shopping-cart',color:"orange"},
]


const handleToExam=()=>{
    router.push('/exam')
}
const handleToMymark=()=>{
    router.push('/mymark')
}
const handleClickNotDevelopment=()=>{
    showDialog({
  title: '加班加点中',
  message: '内容还在开发中,敬请期待！！！',
  theme: 'round-button',
}).then(() => {
  // on close
});
}
</script>

<style lang="scss" scoped>
.van-nav-bar {
  background: #4e4578;
  color: white;
}
:deep(.van-nav-bar__title) {
  color: white !important;
}
img {
  width: 100%;
  height: 200px;
  // object-fit: cover;
}
.van-grid{
    margin-top:20px
}
van-text{
    margin-top: 5px;
    font-size: 12px;
}
.content{
    overflow: auto;
}
</style>
