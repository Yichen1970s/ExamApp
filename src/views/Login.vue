<template>
  <div class="box">
    <div class="content">
      <van-text>Exam_MS考试系统</van-text>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 提交 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref, } from 'vue';
import { useRouter } from 'vue-router';
import {Login} from '../api/login'
import {useUserStore} from '../stores/user'
const username = ref('') 
const password = ref('')
const userStore=useUserStore()
const router=useRouter()
const onSubmit = (values) => {
    Login(values).then(res=>{
        console.log(res);
        if(res.data.code===0){
          userStore.updateToken(res.data.data.token)
          console.log(userStore.token);
          router.push('/')
        }
        console.log(111);
    })
}
</script>

<style lang="scss" scoped>
van-text {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 60px;
  background: red;
}
form {
  margin-top: 20px;
}
.box {
  background: #e0cdcd;
  height: 100vh;
}
</style>
