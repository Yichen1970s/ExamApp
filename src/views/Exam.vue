<template>
  <div>
    <van-nav-bar title="在线考试" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-search
      v-model="title"
      placeholder="请输入搜索关键词"
      input-align="center"
      shape="round"
      background="#4e4578"
      @update:model-value="handleSearchChange"
    />
    <van-tabs v-model:active="openType" @change="handleChangeType">
      <van-tab title="全部"></van-tab>
      <van-tab title="完全开放"></van-tab>
      <van-tab title="指定类型"></van-tab>
    </van-tabs>

<div class="box">
  <div class="examItem" v-for="item in examList">
      <van-card
        :desc="item.createTime"
        :title="item.title"
      >
        <template #tags>
          <div>开始时间: <van-tag plain type="primary">{{item.startTime?item.startTime:'无期限'}}</van-tag></div>
          <div>截止时间: <van-tag plain type="danger">{{item.endTime?item.endTime:'无期限'}}</van-tag></div>
          <div>考试描述: <van-tag plain type="warning">{{item.content}}</van-tag></div>
          <div>总分: <van-tag plain type="warning">{{item.totalScore}}分</van-tag></div>
          <div>考试时间: <van-tag plain type="primary">{{ item.timeLimit ?  '限定时段':'不限定时段' }}</van-tag></div>
          <div>考试时常: <van-tag plain type="primary">{{ item.totalTime}}分钟</van-tag></div>
          <div>考试类型: <van-tag plain type="danger">{{ item.openType===1?'完全公开':'指定部门'}}</van-tag></div>
          <van-button type="primary" class="examButton" size="small" @click="handleToExamDetail(item.id)"><van-icon name="arrow" /></van-button>
        </template>
      </van-card>
    </div>
    <van-pagination v-model="current" :total-items="totalItems" :items-per-page="size" />
</div>
    

    <Footer :active="1" class="footer"></Footer>
  </div>
</template>

<script setup>
import Footer from '../components/Footer.vue'
import { ExamPaging } from '../api/exam'
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
const router=useRouter()
import _default from 'vant';
const userStore = useUserStore()
const title = ref('')
const openType = ref(0)
const current = ref(1)
const size = ref(10)
const totalItems = ref(0)
const examList=ref([])
// ExamPaging()
onMounted(() => {
  const data = {
    current: current.value,
    size: size.value,
    params: { title: title.value },
    t: userStore.userId
  }
  console.log(data)
  ExamPaging(data).then((res) => {
    console.log(res.data.data.records);
    const datalist=[...res.data.data.records]
    res.data.data.records.forEach((item,index)=>{
      if(!item.startTime){
        datalist[i].disable=false
      }else{
        const nowtime = new Date()
        const starttime=item.startTime
      }
    })
     examList.value = res.data.data.records
    totalItems.value = examList.value.length
  })
})
const onClickLeft=()=>{
  router.back(1)
}
const handleChangeType=()=>{
  if(openType.value===0){
    openType.value=''
  }
  const data = {
    current: current.value,
    size: size.value,
    params: { title: title.value,openType:openType.value },
    t: userStore.userId
  }
  ExamPaging(data).then((res) => {
     examList.value = res.data.data.records
    totalItems.value = examList.value.length
  })
}
const handleSearchChange=()=>{
  console.log(openType.value);
  if(openType.value===0){
    openType.value=''
  }
  const data = {
    current: current.value,
    size: size.value,
    params: { title: title.value,openType:openType.value },
    t: userStore.userId
  }
  ExamPaging(data).then((res) => {
     examList.value = res.data.data.records
    totalItems.value = examList.value.length
  })
}

const handleToExamDetail=(id)=>{
  router.push(`/examdetail/${id}`)
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
.box{
  min-height: 100px;
  overflow: auto;
}
.van-pagination {
  margin-top: 10px;
  clear: both;
}
.examItem{
  margin-bottom: 10px;
}
.examItem div{
  margin-bottom: 3px;
  position: relative;
}
.examButton{
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
}
.van-card__title van-multi-ellipsis--l2{
  font-size: 30px;
}
.footer{
  margin-top: 50px;
}
</style>
