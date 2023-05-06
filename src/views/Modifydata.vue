<template>
    <div>
        <van-nav-bar title="我的信息" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="username" name="用户名" label="用户名"  readonly/>
                <van-field v-model="name" name="姓名" label="姓名" readonly/>
                <van-field v-model="depart" name="部门" label="部门" readonly/>
                <van-field v-model="roles" name="角色" label="角色" readonly/>
            </van-cell-group>
       
        </van-form>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import { info } from '../api/login'
import { departList } from '../api/my'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router';
const router = useRouter()

const username = ref()
const name = ref()
const depart = ref()
const depart1 = ref()
const roles = ref()
const data = {}
const arr=ref([])

const userStore = useUserStore()
const token = userStore.token
info({ token: token }).then(res=>{
    // console.log(res.data.data);
    username.value= res.data.data.userName
    name.value= res.data.data.realName
    depart1.value= res.data.data.departId
    roles.value= res.data.data.roles
})
departList(data).then(res => {
    console.log(res.data.data[0].children);
    arr.value = res.data.data[0].children
    console.log(arr.value);
    for (var i = 0; i < arr.value.length;i++){
        if (depart1.value== arr.value[i].id) {
            depart.value = arr.value[i].deptName
            
        }

    }
    
})
const onClickLeft = () => {
    router.back(1)
}
</script>

<style scoped>
.van-nav-bar {
    background: #4e4578;
    color: white;
}

:deep(.van-nav-bar__title) {
    color: white !important;
}

.van-cell-group {
    margin-top: 20px;
}

.van-field {
    margin-top: 10px;
}
</style>