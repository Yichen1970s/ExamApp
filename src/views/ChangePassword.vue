<template>
    <div>
        <van-nav-bar title="修改密码" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="password1" type="password" name="密码" label="第一次密码" placeholder="请填写密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                <van-field v-model="password2" type="password" name="密码" label="第二次密码" placeholder="请再次填写密码"
                    :rules="[{ required: true, message: '请再次填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const password1 = ref()
const password2 = ref()
const data = ref()
import { showDialog } from 'vant';
import { updataPassword } from '../api/my'
import { info } from '../api/login'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router';
const router = useRouter()
const userStore = useUserStore()
const token = userStore.token
info({ token: token }).then(res => {
    data.value = res.data.data
})
const onSubmit = () => {
    if (password1.value != password2.value) {
        showDialog({ message: '两次密码输入不一致' });
        return
    } else {
        data.value.password = password2.value
        updataPassword(data.value)
        showDialog({ message: '修改成功！' });
        router.push('/login')
    }
    
}
const onClickLeft = () => {
    router.back(1)
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

.van-cell {
    border-bottom: 1px #ccc solid;
    height: 60px;
    margin-top: 12px;
}
</style>