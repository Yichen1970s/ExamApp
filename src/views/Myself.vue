<template>
  <div>
    <van-nav-bar title="用户中心" left-text="返回" left-arrow @click-left="onClickLeft" />
    我的页面
    <Footer :active="2"></Footer>
  </div>
</template>

<script setup>
import Footer from '../components/Footer.vue'
</script>

<style lang="scss" scoped>
.van-nav-bar{
    background: #4e4578;
    color: white;
}
:deep(.van-nav-bar__title){
    color: white !important;
}
</style>
