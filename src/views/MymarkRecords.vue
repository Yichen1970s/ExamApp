<template>
  <div>
    <van-nav-bar title="考试记录" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="box" v-for="item in markList">
      <p class="mark" style="font-size:1.7rem;font-weight: bold;color: #367fea;">考试时间：<span>{{ item.createTime }}</span></p>
      <div class="wrap">
        <div class="message">
          <p class="mark">是否合格：<span>{{ item.hasSaq?'不合格':'合格'}}</span></p>
          <p class="mark">考试用时：<span>{{ item.userTime }}</span>分钟</p>
        </div>
        <div class="message">
          <p class="mark">考试得分：<span>{{ item.userScore }}</span>分</p>
          <p class="mark">考试状态：<span>{{ item.state===2?'已考完':'考试中'}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getExamfirstpaging, getExamXiangQing } from '../api/mark'
const router = useRouter()
const markList=ref([])
onMounted(() => {
  getExamfirstpaging({current: 1, size: 5, params: {userId: "10001", examId: "1654681483156914177"}}).then((res)=>{
    console.log(res.data.data.records); 
    markList.value = res.data.data.records
    // console.log(markList.value);
  })
})
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

.box {
  margin-top: 1%;
  padding: 0 5%;
  border-bottom: 1px solid #ddd;

  .wrap {
    display: flex;
    justify-content:start;
    .words {
      .mark {
        color: #666;
        font-size: 1.5rem;

      }

      .test {
        color: #aaa;
      }
    }

    .message {
      font-size: 1.5rem;
      margin-right: 15%;
    }
  }
  }
</style>
