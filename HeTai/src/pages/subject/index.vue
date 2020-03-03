<template>
  <div>
    <div class="title">
      <van-search
        :value="value"
        placeholder="请输入搜索关键词"
        use-action-slot
        @search="onSearch"
        class="search"
      >
        <view slot="action" @click="onSearch">搜索</view>
      </van-search>
      <img src="/static/images/my.png" mode="widthFix" @click="toMy()" />
      <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfoClick"></button>
    </div>

    <van-cell title="| 形态课程" size="large" is-link value="更多" @click="tomore(0)"/>
    <div class="center">
      <div v-for="(item,index) in video" :key="index" class="box" @click="todetail()">
        <img :src="title" mode="widthFix" />
        <div class="infor">
          <p>体态课程{{index+1}}</p>
        </div>
      </div>
    </div>

    <van-cell title="| 心理课程" size="large" is-link value="更多" @click="tomore(1)"/>
    <div class="center">
      <div v-for="(item,index) in video" :key="index" class="box" @click="todetail()">
        <img :src="foot" mode="widthFix" style="width: 530rpx;"/>
        <div class="infor">
          <p>心理课程{{index+1}}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      video:[0,1,2],
      article:[0,1,2],
      title:"",
      foot:""
    }
  },

  methods: {
    toMy() {
      const url = "../my/main";
      wx.navigateTo({ url });
    },
    todetail() {
      const url = "../subjectdetail/main";
      wx.navigateTo({ url });
    },
    tomore(e){
      const url = "../subjectmore/main?id="+e;
      wx.navigateTo({ url });
    },

    wxGetUserInfo (code) {
        var that = this;
        wx.getUserInfo({
            withCredentials: true,
            success (res) {
                that.globalData.userInfo=res.userInfo
            },
            fail (err) {
                console.log('自动wx.getUserInfo失败:',err);
                // 显示主动授权的button
                that.buttonVisible = true;
            }
        })
    },
    bindGetUserInfo(e) {
        // console.log('回调事件后触发')
        var that = this;
        if (e.mp.detail.userInfo){
            console.log('用户按了允许授权按钮')
            that.globalData.userInfo=e.mp.detail.userInfo
            that.toMy();
        } else {
            //用户按了拒绝按钮
            console.log('用户按了拒绝按钮');
        }
    }
  },
  mounted () {
    const self = this;
    wx.login({
        success (res) {
            if (res.code){
                self.code = res.code;
                self.wxGetUserInfo(res.code);
            }
        },
    })
},
  created() {
    wx.cloud.getTempFileURL({
      fileList: ["cloud://flash-7b960a.666c-flash-7b960a-1257750062/search.jpg",
      "cloud://flash-7b960a.666c-flash-7b960a-1257750062/foot.jpg"],
      success: res => {
        this.title=res.fileList[0].tempFileURL
        this.foot=res.fileList[1].tempFileURL
      },
      fail: err => {
        console.log(err);
      }
    });
  }
}
</script>

<style scoped>
.title {
  background-size: cover;
  height: 120rpx;
}
.title img {
  width: 60rpx;
  position: absolute;
  top: 25rpx;
  left: 10rpx;
}
.title button{
  position: absolute;
  top:30rpx;
  left: 20rpx;
  width: 50rpx;
  height: 50rpx;
  background-color:transparent;
  border-style:none;
  opacity:0
}
.search {
  position: relative;
  left: 60rpx;
}

.center{
  width: 100%;
  height: 480rpx;
  display: flex;
  flex-direction: column;
}
.box{
  width: 90%;
  height: 140rpx;
  margin: 10rpx 10rpx 10rpx 35rpx;
  border-radius: 35rpx;
  border: 1rpx solid #1e4d78;
  display: flex;
  flex-direction: row;
}

.box img {
  width: 530rpx;
  border-radius: 35rpx;
}
.infor {
  margin-left: 30rpx;
  width: 500rpx;
  height: 100%;
  flex-direction: column;
}
.infor p {
  margin: 7rpx;
  width: 100%;
  height: 40rpx;
}
</style>
