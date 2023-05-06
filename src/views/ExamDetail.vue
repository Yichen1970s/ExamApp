<template>
  <van-nav-bar title="考试详情" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div>
    <van-cell title="考试名称" :value="examList.title" size="large" />
    <van-cell title="考试时长" :value="examList.totalTime" size="large" />
    <van-cell title="试卷总分" :value="examList.totalScore" size="large" />
    <van-cell title="及格分数" :value="examList.qualifyScore" size="large" />
    <van-cell title="考试描述" :value="examList.openType == 1 ? '完全公开' : '部门开放'" size="large" />
    <van-cell title="开放类型" :value="examList.content" size="large" />
  </div>
  <div class="box">
    <van-button type="primary" @click="handleToStart" class="startBtn">开始考试</van-button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';
import { ExamDetail, createExam } from '../api/exam'
const router = useRouter()
const route = useRoute()
console.log(route.params.id);
const examList = ref({})
ExamDetail({ id: route.params.id }).then(res => {
  console.log(res.data.data);
  examList.value = res.data.data
  console.log(examList.value);
})

const onClickLeft = () => {
  router.back(1)
}
const handleToStart = () => {
  createExam({ examId: route.params.id }).then(res => {
    if (res.data.code === 0) {
      router.push(`/examstart/${res.data.data.id}`)
    } else {
      alert('您有正在进行的考试')
    }
  })
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

.startBtn {
  width: 200px;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}</style>
