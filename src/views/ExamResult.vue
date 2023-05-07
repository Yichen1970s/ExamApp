<template>
  <div>
    <van-nav-bar title="考试结果" left-text="返回" left-arrow @click="onClickLeft" />
    <div style="text-align: center; margin-bottom: 5px; font-size: 20px">{{ ExamObj.title }}</div>
    <div style="text-align: center; margin-bottom: 5px; font-size: 15px">
      {{ ExamObj.createTime }}
    </div>
    <div class="box1">
      <span>考生姓名:{{ username }}</span
      ><span>考试用时:{{ ExamObj.userTime }}min</span><span>考试得分:{{ ExamObj.userScore }}</span>
    </div>
    <div class="ExamList" v-for="(item, index) in ExamObj.quList">
      <div
        style="
          padding: 5px;
          background-color: #fff;
          border-radius: 5px;
          width: 343px;
          margin: 0 auto;
        "
      >
        {{ index + 1 }}.{{ item.content }}
      </div>
      <van-checkbox-group v-model="item.clickAnswerValue">
        <van-cell-group inset>
          <van-cell
            v-for="(item1, index1) in item.answerList"
            clickable="false"
            :key="index1"
            :title="item1.content"
            @click="toggle(index1)"
          >
            <template #right-icon>
              <van-checkbox
                :name="item1.id"
                :ref="(el) => (checkboxRefs[index1] = el)"
                @click.stop
              />
            </template>
          </van-cell>
        </van-cell-group>
        <div class="tishi">
          <span style="color: green">正确答案:{{ item.RigitZimu }}</span>
          <span :style="item.isRight ? 'color:green' : 'color:red'"
            >答案结果:{{ item.clickZimu }}</span
          >
        </div>
      </van-checkbox-group>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { ExamScore } from '../api/exam'
import { useUserStore } from '../stores/user'
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const username = userStore.username
const ExamObj = ref({})
const quList = ref([])
const checkedValue1 = ref([])
const onClickLeft = () => {
  router.push('/exam')
}

ExamScore({ id: route.params.id }).then((res) => {
  console.log(res)
  ExamObj.value = res.data.data
  res.data.data.quList.forEach((item) => {
    const clickAnswerValue = [] //选择的内容
    const clickZimu = [] //考生选择的答案
    const RigitZimu = [] //正确答案
    item.answerList.forEach((i) => {
      if (i.checked) {
        clickAnswerValue.push(i.id)
        clickZimu.push(i.abc)
      }
      if (i.isRight) {
        RigitZimu.push(i.abc)
      }
    })
    item.clickAnswerValue = clickAnswerValue
    item.clickZimu = clickZimu.join(',')
    item.RigitZimu = RigitZimu.join(',')
  })
  console.log(res.data.data.quList)
})

const checkboxRefs = ref([])
const toggle = (index) => {
  checkboxRefs.value[index].toggle()
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
.ExamList {
  margin-bottom: 10px;
}
.box1 {
  display: flex;
  justify-content: space-around;
  font-size: 15px;
}
.tishi {
  width: 343px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.tishi span {
  font-size: 15px;
}
</style>
