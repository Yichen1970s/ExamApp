<template>
    <div>
    <van-tabbar v-model="active1" >
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="records" to="/exam">考试</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/myself">我的</van-tabbar-item>
    </van-tabbar>
    </div>
</template>

<script setup>
  import { ref,defineProps } from 'vue';

  const state=defineProps({
    active:{
        typeof:Number,
        default:0
    }
  })
  const active1=ref(state.active)
</script>

<style lang="scss" scoped>

</style>