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

    <van-cell v-if="id==2" title="| 咨询服务" size="large" is-link/>

    <van-cell v-else :title="'| '+ name[id]" size="large" is-link/>

    <div v-if="id==2" class="top">
      <div class="box" v-for="(item,index) in video" :key="index">
        <img :src="title" mode="widthFix" />
        <div class="infor">
          <p>姓名{{index+1}}</p>
          <p>在职医院{{index+1}}</p>
          <p>职业{{index+1}}</p>
        </div>
      </div>
    </div>

    <div v-else class="center">
      <div v-for="(item,index) in video" :key="index" class="box" @click="todetail()">
        <img :src="title" mode="widthFix" />
        <div class="infor">
          <p>{{name[id]}}{{index+1}}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      video:[0,1,2,3,4,5,6,7,8,9],
      title:"",
      name:["体态课程","心理课程"],
      id:''
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
    let pages = getCurrentPages() //获取加载的页面
    let currentPage = pages[pages.length-1] //获取当前页面的对象
    let options = currentPage.options //如果要获取url中所带的参数可以查看options
    this.id=options.id

    wx.cloud.getTempFileURL({
      fileList: ["cloud://flash-7b960a.666c-flash-7b960a-1257750062/search.jpg",
      "cloud://flash-7b960a.666c-flash-7b960a-1257750062/foot.jpg",
      "cloud://flash-7b960a.666c-flash-7b960a-1257750062/body_ill.png"],
      success: res => {
        this.title=res.fileList[this.id].tempFileURL
        console.log(this.title)
      },
      fail: err => {
        console.log(err);
      }
    });

    const self = this;
    wx.login({
        success (res) {
            if (res.code){
                self.code = res.code;
                self.wxGetUserInfo(res.code);
            }
        },
    })
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
  height: auto;
  display: flex;
  flex-direction: column;
}
.center .box{
  width: 90%;
  height: 140rpx;
  margin: 10rpx 10rpx 10rpx 35rpx;
  border-radius: 35rpx;
  border: 1rpx solid #1e4d78;
  display: flex;
  flex-direction: row;
}

.center .box img {
  width: 530rpx;
  border-radius: 35rpx;
}
.center .infor {
  margin-left: 30rpx;
  width: 500rpx;
  height: 100%;
  flex-direction: column;
}
.center .infor p {
  margin: 7rpx;
  width: 100%;
  height: 40rpx;
}

.top {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}
.top .box {
  width: 90%;
  height: 160rpx;
  background-color: #deebf7;
  border-radius: 50rpx;
  margin: 20rpx 20rpx 20rpx 30rpx;
  display: flex;
  flex-direction: row;
}
.top .box img {
  width: 150rpx;
  border-radius: 50rpx;
  background-color: #1e4d78;
}
.top .infor {
  margin-left: 30rpx;
  width: 500rpx;
  height: 100%;
  flex-direction: column;
}
.top .infor p {
  margin: 7rpx;
  width: 100%;
  height: 40rpx;
}
</style>
