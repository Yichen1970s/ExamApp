<template>
  <div>
    <van-nav-bar title="用户中心" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-uploader v-model="fileList" :max-count="1" multiple="false"/>
    <div class="name">学员{{ studentName }}</div>
    <van-cell title="修改资料" is-link @click="handleToModifydata"/>
    <van-cell title="我的成绩" is-link  @click="handleToMymark"/>
    <van-cell title="密码安全" is-link />
    <van-cell title="退出登录" is-link />
    <Footer :active="2"></Footer>

  </div>
</template>

<script setup>
import Footer from '../components/Footer.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const fileList = ref([
])
const studentName = ref('A')
const handleToMymark=()=>{
   router.push('/mymark')
}
const handleToModifydata = () => {
  router.push('/modifydata')
}
</script>

<style lang="scss" scoped>
.van-nav-bar{
    background: #4e4578;
    color: white;
}
:deep(.van-nav-bar__title){
    color: white !important;
}

:deep(.van-uploader){
  margin-top: 50px  !important;
  margin-left: 150px !important
}
.name{
  margin-left: 170px;
}
.van-cell{
  border-bottom: 1px #ccc solid;
}
</style>
