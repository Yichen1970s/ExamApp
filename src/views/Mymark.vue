<template>
  <div>
    <van-nav-bar title="我的成绩" left-text="返回" left-arrow @click-left="onClickLeft" />
    成绩
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.van-nav-bar {
  background: #4e4578;
  color: white;
}
:deep(.van-nav-bar__title) {
  color: white !important;
}
</style>
