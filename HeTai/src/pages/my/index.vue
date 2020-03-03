<template>
  <div>
    <!-- 背景绿色部分 -->
    <div class="green"></div>

    <header class="box">
      <div class="top">
        <div class="circle">
          <img :src="info.avatarUrl" mode="widthFix">
        </div>
        <div class="name">{{info.nickName}}</div>
      </div>
      <div class="center">
        <div class="left">已购课程</div>
        <div class="left">
          <div>体态评测成绩</div>
          <div>未评测</div>
        </div>
      </div>
    </header>

    <div class="box" v-for="(item,index) in tips" :key="index">
      <div class="center" v-for="(itemx,index1) in item" :key="index1">
        <div class="name">{{itemx.tip}}</div>
        <div style="float:right;line-height:3;">> &nbsp;  </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      tips: {
        0: [
          {
            img: "",
            tip: "购买会员"
          },
          {
            img: "",
            tip: "易购视频"
          },
          {
            img: "",
            tip: "我的收藏"
          }
        ],
        1: [
          {
            img: "",
            tip: "修改密码"
          },
          {
            img: "",
            tip: "我的奖励"
          },
          {
            img: "",
            tip: "邀请用户"
          }
        ]
      },
      info:[]
    };
  },

  mounted() {
    this.info=this.globalData.userInfo
  }
};
</script>

<style>
page {
  background: #e6e3e3;
}
.green {
  background: #deebf7;
  position: absolute;
  width: 100%;
  height: 350rpx;
  top: -1rpx;
  float: left;
}
.box {
  background: white;
  width: 565rpx;
  height: 360rpx;
  border-radius: 50rpx;
  position: relative;
  left: 40rpx;
  top: 60rpx;
  margin: 50rpx;
}
.top {
  width: 100%;
  border-radius: 50rpx 50rpx 0 0;
  height: 240rpx;
  margin: 0;
}
.center {
  width: 100%;
  height: 120rpx;
  margin: 0;
  border-top: 1rpx solid #e4dede;
  white-space:pre;
}
.box > .center:first-child {
  border: none;
}
.circle {
  width: 200rpx;
  height: 200rpx;
  border-radius: 100rpx;
  background: #1e4d78;
  position: absolute;
  top: 30rpx;
  left: 20rpx;
}
.circle img{
  width: 200rpx;
  border-radius: 100rpx;
}
.name {
  min-width: 200rpx;
  float: right;
  position: relative;
  top: 85rpx;
  right: 30rpx;
}
.left {
  width: 50%;
  height: 120rpx;
  float: left;
  clear: right;
  text-align: center;
  color: gray;
  font-size: 32rpx;
}
.center > .left:first-child {
  line-height: 3;
}
.left > div:last-child {
  color: black;
  font-weight: bold;
  font-size: 40rpx;
}
.center>.name{
  min-width: 200rpx;
  height: 100%;
  float: left;
  position: relative;
  top:0;
  right: 0;
  left: 45rpx;
  line-height: 3;
}
</style>
