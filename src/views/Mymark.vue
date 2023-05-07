<template>
  <div>
    <van-nav-bar title="我的成绩" left-text="返回" left-arrow @click-left="onClickLeft" />

    <div class="box" v-for="item in testList" :key="item.id">
      <div class="wrap">
        <div class="words">
          <p class="h1">{{ item.title }}</p>
          <p class="mark">最高分：<span>{{ item.maxScore }}</span></p>
          <p class="test">最近考试：<span>{{ item.createTime }}</span></p>
        </div>
        <div class="message">
          <p style="color: #367fea;" v-if= item.passed >通过</p>
          <p style="color: #ec190f;" v-else>不通过</p>
        </div>
      </div>
      <div class="btn">
        <van-button type="danger">错题训练</van-button>
        <van-button type="success" to="mymarkrecords">考试记录</van-button>
      </div>
    </div>

    <Footer :active="2"></Footer>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import Footer from '../components/Footer.vue'
import { useRouter } from 'vue-router';
import { getExampaging, getExamXiangQing } from '../api/mark'


const router = useRouter()
const testList=ref([])
onMounted(() => {
  getExampaging({current: 1, size: 10, params: {title: ""}, t: 1683340559552}).then((res)=>{
    // console.log(res.data.data.records);
    testList.value = res.data.data.records
    console.log(testList.value);
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
  padding: 0 5%;
  border-bottom: 1px solid #ddd;

  .wrap {
    position: relative;
    display: flex;

    .words {
      line-height: 1rem;
      margin-bottom: 2%;

      .h1 {
        font-size: 1.8rem;
        font-weight: bold;
        line-height: 3rem;
      }

      .mark {
        color: #666;
        font-size: 1.5rem;

      }

      .test {
        color: #aaa;
      }
    }

    .message {
      position: absolute;
      top: 35%;
      right: 5%;
      font-weight: bold;
      font-size: 1.5rem;
    }
  }

  .btn {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8%;

    .van-button {
      width: 48%;
    }
  }
}</style>
