<template>
  <div class="Bigbox">
    <van-nav-bar title="正在考试" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="box">
      <div class="timebox">
        考试剩余时间:<van-count-down :time="time" format="HH 时 mm 分 ss 秒" @finish="timeChange"/><van-button
          type="primary"
          size="small"
          @click="handleSubmitExam"
          ref="myElement"
          >提交试卷</van-button
        >
      </div>
      <div class="allArea">
        <div class="examArea">
          <div style="color: rgb(159 107 107); margin-bottom: 5px">
            {{ examNumber }}.[{{ examType }}] {{ examScore }}分
          </div>
          <div style="padding: 5px; background-color: #fff; border-radius: 5px">{{ content }}</div>
        </div>
        <!-- 单选 判断用这个 -->
        <van-radio-group v-model="checkedValue" style="" v-if="examType!=='多选题'">
          <van-cell-group inset v-for="(item, index) in answerList">
            <van-cell
              :title="item.abc + '.' + item.content"
              clickable
              @click="hanleClickAnswer(item.id)"
            >
              <template #right-icon>
                <van-radio :name="item.id" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <!-- 单选 判断用这个-->
        <!-- 多选 -->
        <van-checkbox-group v-model="checkedValue1" v-else>
          <van-cell-group inset>
            <van-cell
              v-for="(item, index) in answerList"
              clickable
              :key="index"
              :title="item.abc + '.' + item.content"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox :name="item.id" :ref="(el) => (checkboxRefs[index] = el)" @click.stop />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <!-- 多选 -->
        <div class="btnArea">
          <van-button
            type="primary"
            size="small"
            :disabled="examNumber <= 1"
            @click="handleTest(-1)"
            >上一题</van-button
          >
          <van-button
            type="primary"
            size="small"
            :disabled="examNumber >= examList.length"
            @click="handleTest(1)"
            >下一题</van-button
          >
          <van-button type="success" size="small">答题卡</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch,onBeforeUpdate } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ExamStartDetail, TimuDetail,AnswerContent,submitExam } from '../api/exam'
import { showConfirmDialog } from 'vant';


const myElement = ref()
const router = useRouter()
const route = useRoute()
const time = ref(1000) //时间
const judgeList = ref([])
const multiList = ref([])
const radioList = ref([])
const examList = ref([]) //题id组
const examType = ref('单选题')
const examNumber = ref(1) //当前题号
const examScore = ref(0)
const content = ref('') //单个题目内容
const answerList = ref([]) //单个题目 选项内容
const checkedValue = ref('')
const checkedValue1 = ref([])//多选答案
const onClickLeft = () => {
  router.back(1)
}

const timeChange=(a)=>{
  let answerValue=[]
  if(checkedValue.value!=''){
    answerValue.push(checkedValue.value)
  }else if(checkedValue.value===''){
    answerValue=[...checkedValue1.value]
  }
  const data={
    paperId:examList.value[examNumber.value - 1].paperId,
    quId: examList.value[examNumber.value - 1].quId,
    answer:'',
    answers:answerValue
  }
  AnswerContent(data).then(res=>{
    console.log(res.data);
  })
  checkedValue.value='',
  checkedValue1.value=[]
    submitExam({id:route.params.id}).then(res=>{  
    console.log(res.data);
    if(res.data.code===0){
      alert('到点了 试卷已自动提交')
      router.push(`/examresult/${route.params.id}`)
    }
  })

}

    const checkboxRefs = ref([]);
    const list=ref(['a', 'b'])
    const toggle = (index) => {
      checkboxRefs.value[index].toggle();
      console.log(checkedValue1.value);
    };

    onBeforeUpdate(() => {
      checkboxRefs.value = [];
    });
//试卷详情
ExamStartDetail({ id: route.params.id }).then((res) => {
  const endTime = Date.parse(res.data.data.limitTime)
  const nowtime = new Date()
  time.value = endTime - Date.parse(nowtime)
  console.log(res.data.data)
  judgeList.value = res.data.data.judgeList
  multiList.value = res.data.data.multiList
  radioList.value = res.data.data.radioList
  examList.value = [...radioList.value, ...multiList.value, ...judgeList.value]
  examScore.value = examList.value[examNumber.value - 1].score //初始化分数
  TimuDetail({
    paperId: examList.value[examNumber.value - 1].paperId,
    quId: examList.value[examNumber.value - 1].quId
  }).then((res) => {
    answerList.value = res.data.data.answerList
    content.value = res.data.data.content
    if(res.data.data.answered){
      if(res.data.data.quType!==2){
        //有答案且不为多选
        res.data.data.answerList.forEach((item)=>{
          if(item.checked===true){
            checkedValue.value=item.id
          }
        })
      }else{
        //有答案 且为多选
        res.data.data.answerList.forEach((item)=>{
          if(item.checked===true){
            checkedValue1.value.push(item.id)
          }
        })
      }
    }

  })
})

const handleTest = (number) => {
  //添加答案-----------------------------------
  let answerValue=[]
  if(checkedValue.value!=''){
    answerValue.push(checkedValue.value)
  }else if(checkedValue.value===''){
    answerValue=[...checkedValue1.value]
  }
  const data={
    paperId:examList.value[examNumber.value - 1].paperId,
    quId: examList.value[examNumber.value - 1].quId,
    answer:'',
    answers:answerValue
  }
  AnswerContent(data).then(res=>{
    console.log(res.data);
  })
  checkedValue.value='',
  checkedValue1.value=[]
  //添加答案----------------------
  //获取下一题或上一题的详情
  examNumber.value = examNumber.value + number
  TimuDetail({
    paperId: examList.value[examNumber.value - 1].paperId,
    quId: examList.value[examNumber.value - 1].quId
  }).then((res) => {
    answerList.value = res.data.data.answerList
    content.value = res.data.data.content
    if(res.data.data.answered){
      if(res.data.data.quType!==2){
        //有答案且不为多选
        res.data.data.answerList.forEach((item)=>{
          if(item.checked===true){
            checkedValue.value=item.id
          }
        })
      }else{
        //有答案 且为多选
        res.data.data.answerList.forEach((item)=>{
          if(item.checked===true){
            checkedValue1.value.push(item.id)
          }
        })
      }
    }
  })

}
watch(examNumber, () => {
  // console.log(examList.value[examNumber.value - 1])
  examScore.value = examList.value[examNumber.value - 1].score
  if (examList.value[examNumber.value - 1].quType === 1) {
    examType.value = '单选题'
  } else if (examList.value[examNumber.value - 1].quType === 2) {
    examType.value = '多选题'
  } else {
    examType.value = '判断题'
  }
})
const hanleClickAnswer = (answer) => {
  checkedValue.value = answer
  // console.log(checkedValue.value)

}

//交卷
const handleSubmitExam=()=>{
  
  showConfirmDialog({
  title: '标题',
  message:
    '是否要提交试卷',
})
  .then(() => {
    let answerValue=[]
  if(checkedValue.value!=''){
    answerValue.push(checkedValue.value)
  }else if(checkedValue.value===''){
    answerValue=[...checkedValue1.value]
  }
  const data={
    paperId:examList.value[examNumber.value - 1].paperId,
    quId: examList.value[examNumber.value - 1].quId,
    answer:'',
    answers:answerValue
  }
  AnswerContent(data).then(res=>{
    console.log(res.data);
  })
  checkedValue.value='',
  checkedValue1.value=[]
    submitExam({id:route.params.id}).then(res=>{  
    console.log(res.data);
    if(res.data.code===0){
      router.push(`/examresult/${route.params.id}`)
    }
  })
  })
  .catch(() => {
    // on cancel
  });
 
}
</script>

<style lang="scss" scoped>
.Bigbox {
  background-color: #eff2f5;
  min-height: 100vh;
}
.van-nav-bar {
  background: #4e4578;
  color: white;
}
:deep(.van-nav-bar__title) {
  color: white !important;
}
.box {
  padding: 10px;
}
.timebox {
  display: flex;
  font-size: 15px;
  justify-content: space-around;
  align-items: center;
  margin-top: 5px;
  padding: 5px;
  background: #ccc;
}
:deep(.van-count-down) {
  font-size: 20px !important;
  line-height: 28px;
  color: red;
}
:deep(.van-cell__title) {
  width: 270px;
}
:deep(.van-cell--clickable) {
  border-bottom: 1px solid #ccc !important;
}
.examArea {
  padding: 10px 16px;
}
.btnArea {
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
}
</style>
