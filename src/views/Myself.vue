<template>
  <div>
    <van-nav-bar title="用户中心" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-uploader v-model="fileList" :max-count="1" multiple="false" />
    <div class="name">学员{{ studentName }}</div>
    <van-cell title="我的信息" is-link @click="handleToModifydata" />
    <van-cell title="我的成绩" is-link @click="handleToMymark" />
    <van-cell title="修改密码" is-link @click="handleToChangePassword" />
    <van-cell title="退出登录" is-link @click="leave" />
    <Footer :active="2"></Footer>

  </div>
</template>

<script setup>
import Footer from '../components/Footer.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { exit } from '../api/my'
import { info } from '../api/login'
import { useUserStore } from '../stores/user'
import { showDialog } from 'vant';
const router = useRouter()
const tuichu = {}

const fileList = ref([
])
const studentName = ref()
const handleToMymark = () => {
  router.push('/mymark')
}
const handleToModifydata = () => {
  router.push('/modifydata')
}
const handleToChangePassword = () => {
  router.push('/changepassword')
}

const leave = () => {
  exit(tuichu)
  showDialog({ message: '退出成功！' });
  router.push('/login')
}
const userStore = useUserStore()
const token = userStore.token
info({ token: token }).then(res => {
  console.log(res.data.data);
  studentName.value = res.data.data.realName
})
</script>

<style lang="scss" scoped>
.van-nav-bar {
  background: #4e4578;
  color: white;
}

:deep(.van-nav-bar__title) {
  color: white !important;
}

:deep(.van-uploader) {
  margin-top: 50px !important;
  margin-left: 150px !important
}

.name {
  margin-left: 150px;
}

.van-cell {
  border-bottom: 1px #ccc solid;
  height: 50px;
  margin-top: 10px;
}</style>
