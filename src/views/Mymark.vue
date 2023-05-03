<template>
  <div>
    <van-nav-bar title="我的成绩" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="box">
      <div class="wrap">
        <div class="words">
          <p class="h1">中国近代史考试</p>
          <p class="mark">最高分：<span>15</span></p>
          <p class="test">最近考试：<span>2023-05-01 13:55:20</span></p>
        </div>
        <div class="message">
          <p style="color: #367fea;">通过</p>
          <p style="display:none; color: #ec190f;">不通过</p>
        </div>
      </div>
      <div class="btn">
          <van-button type="danger">错题训练</van-button>
          <van-button type="success">考试记录</van-button>
      </div>
    </div>
    <div class="box">
      <div class="wrap">
        <div class="words">
          <p class="h1">中国近代史考试</p>
          <p class="mark">最高分：<span>15</span></p>
          <p class="test">最近考试：<span>2023-05-01 13:55:20</span></p>
        </div>
        <div class="message">
          <p style="color: #367fea;">通过</p>
          <p style="display:none; color: #ec190f;">不通过</p>
        </div>
      </div>
      <div class="btn">
          <van-button type="danger">错题训练</van-button>
          <van-button type="success">考试记录</van-button>
      </div>
    </div><div class="box">
      <div class="wrap">
        <div class="words">
          <p class="h1">中国近代史考试</p>
          <p class="mark">最高分：<span>15</span></p>
          <p class="test">最近考试：<span>2023-05-01 13:55:20</span></p>
        </div>
        <div class="message">
          <p style="color: #367fea;">通过</p>
          <p style="display:none; color: #ec190f;">不通过</p>
        </div>
      </div>
      <div class="btn">
          <van-button type="danger">错题训练</van-button>
          <van-button type="success">考试记录</van-button>
      </div>
    </div><div class="box">
      <div class="wrap">
        <div class="words">
          <p class="h1">中国近代史考试</p>
          <p class="mark">最高分：<span>15</span></p>
          <p class="test">最近考试：<span>2023-05-01 13:55:20</span></p>
        </div>
        <div class="message">
          <p style="color: #367fea;">通过</p>
          <p style="display:none; color: #ec190f;">不通过</p>
        </div>
      </div>
      <div class="btn">
          <van-button type="danger">错题训练</van-button>
          <van-button type="success">考试记录</van-button>
      </div>
    </div><div class="box">
      <div class="wrap">
        <div class="words">
          <p class="h1">中国近代史考试</p>
          <p class="mark">最高分：<span>15</span></p>
          <p class="test">最近考试：<span>2023-05-01 13:55:20</span></p>
        </div>
        <div class="message">
          <p style="color: #367fea;">通过</p>
          <p style="display:none; color: #ec190f;">不通过</p>
        </div>
      </div>
      <div class="btn">
          <van-button type="danger">错题训练</van-button>
          <van-button type="success">考试记录</van-button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.van-nav-bar {
  background: #4e4578;
  color: white;
}
:deep(.van-nav-bar__title) {
  color: white !important;
}
.box{
  padding:0 5%;
  border-bottom: 1px solid #ddd;
  .wrap{
    position: relative;
    display: flex;
    .words{
      line-height: 1rem;
      margin-bottom: 2%;
      .h1{
        font-size: 1.8rem;
        font-weight: bold;
        line-height: 3rem;
      }
      .mark{
        color: #666;
        font-size: 1.5rem;

      }
      .test{
        color: #aaa;
      }
    }
    .message{
      position: absolute;
      top: 35%;
      right: 5%;
      font-weight: bold;
      font-size: 1.5rem;
    }
  }
  .btn{
    display: flex;
    justify-content: space-between;
    margin-bottom: 8%;
    .van-button{
      width: 48%;
    }
  }
}
 
</style>
