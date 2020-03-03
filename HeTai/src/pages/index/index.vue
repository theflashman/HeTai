<template>
  <div>
    <view
      class="icon van-icon van-icon van-icon-upgrade van-icon-upgrade"
      style="font-size: 32rpx;"
    ></view>
    <div v-if="title" class="title" :style="'background-image: url('+title+')'">
      <van-search
        :value="value"
        placeholder="请输入搜索关键词"
        use-action-slot
        @search="onSearch"
        class="search"
      >
        <view slot="action" @click="onSearch">搜索</view>
      </van-search>
      <br />
      <div style="margin:10rpx 0 20rpx 30px">
        <span>热搜：</span>
        <span>驼背</span>
        <span>圆肩</span>
        <span>高低肩</span>
      </div>
      <p>身心一体化康复</p>
      <img src="/static/images/my.png" mode="widthFix" @click="toMy()" />
      <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfoClick"></button>
    </div>

    <van-cell title="| 体态常识" size="large" />
    <div class="center">
      <div v-if="center[0]" class="left" :style="'background-image: url('+center[0]+')'">
        <span>体态疾病</span>
      </div>
      <div class="right">
        <div v-if="center[1]" :style="'background-image: url('+center[1]+')'">
          <span>精神心理</span>
        </div>
        <div v-if="center[2]" :style="'background-image: url('+center[2]+')'" @click="totuiwen()">
          <span>日常预防</span>
        </div>
      </div>
    </div>

    <van-cell title="| 体态检测" size="large" />
    <div v-if="title" class="footer" :style="'background-image: url('+foot+')'">
      <div class="box">
        <div>AI体态检测</div>
        <div>自主体态检测</div>
        <div>体态检测报告</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      center: ["", "", ""],
      foot: ""
    };
  },

  methods: {
    onSearch() {
      console.log(this.center);
      console.log(this.foot);
    },

    toMy() {
      const url = "../my/main";
      wx.navigateTo({ url });
    },

    totuiwen() {
      const url = "../tuiwen/main";
      wx.navigateTo({ url });
    },

    wxGetUserInfo(code) {
      var that = this;
      wx.getUserInfo({
        withCredentials: true,
        success(res) {
          that.globalData.userInfo = res.userInfo;
        },
        fail(err) {
          console.log("自动wx.getUserInfo失败:", err);
          // 显示主动授权的button
          that.buttonVisible = true;
        }
      });
    },
    bindGetUserInfo(e) {
      // console.log('回调事件后触发')
      var that = this;
      if (e.mp.detail.userInfo) {
        console.log("用户按了允许授权按钮");
        that.globalData.userInfo = e.mp.detail.userInfo;
        that.toMy();
      } else {
        //用户按了拒绝按钮
        console.log("用户按了拒绝按钮");
      }
    }
  },
  mounted() {
    const self = this;
    wx.login({
      success(res) {
        if (res.code) {
          self.code = res.code;
          self.wxGetUserInfo(res.code);
        }
      }
    });
  },
  created() {
    wx.cloud.getTempFileURL({
      fileList: [
        "cloud://flash-7b960a.666c-flash-7b960a-1257750062/search.jpg",
        "cloud://flash-7b960a.666c-flash-7b960a-1257750062/body_ill.png",
        "cloud://flash-7b960a.666c-flash-7b960a-1257750062/psy_ill.png",
        "cloud://flash-7b960a.666c-flash-7b960a-1257750062/fidden.png",
        "cloud://flash-7b960a.666c-flash-7b960a-1257750062/foot.jpg"
      ],
      success: res => {
        this.title = res.fileList[0].tempFileURL;
        this.center[0] = res.fileList[1].tempFileURL;
        this.center[1] = res.fileList[2].tempFileURL;
        this.center[2] = res.fileList[3].tempFileURL;
        this.foot = res.fileList[4].tempFileURL;
      },
      fail: err => {
        console.log(err);
      }
    });
  }
};
</script>

<style scoped>
.title {
  background-size: cover;
  height: 315rpx;
}
.title span {
  margin: 10rpx;
  color: red;
}
.title p {
  font-size: 60rpx;
  font-family: KaiTi;
  color: #1e4d78;
  font-weight: bold;
  position: relative;
  left: 50rpx;
}
.title img {
  width: 60rpx;
  position: absolute;
  top: 25rpx;
  left: 10rpx;
}

.title button {
  position: absolute;
  top: 30rpx;
  left: 20rpx;
  width: 50rpx;
  height: 50rpx;
  background-color: transparent;
  border-style: none;
  opacity: 0;
}

.search {
  position: relative;
  left: 60rpx;
}

.center {
  width: 100%;
  height: 400rpx;
  margin: 20rpx 0 0 0;
  padding: 0;
  display: flex;
  flex-direction: row;
}
.center div {
  border-radius: 50rpx;
  background-size: auto 70%;
  background-repeat: no-repeat;
  background-position: 100% 100%;
}
.center span {
  position: relative;
  top: 40rpx;
  left: 40rpx;
  font-size: 50rpx;
  font-weight: bolder;
  color: #1e4d78;
}
.left {
  width: 365rpx;
  height: 330rpx;
  margin: 10rpx 0 0 10rpx;
  background-color: #deebf7;
}
.right {
  display: flex;
  flex-direction: column;
  width: 350rpx;
  height: 330rpx;
}
.right div {
  width: 100%;
  height: 147rpx;
  margin: 10rpx;
  background-color: #deebf7;
}

.footer {
  background-size: cover;
  height: 315rpx;
  border-radius: 50rpx;
  margin: 10rpx;
}
.box {
  display: flex;
  flex-direction: column;
  width: 375rpx;
  height: 270rpx;
  position: relative;
  left: 80rpx;
  top: 18rpx;
}
.box div {
  width: 100%;
  height: 80rpx;
  background-color: #deebf7;
  margin: 20rpx 0 0 0;
  border-radius: 20rpx;
  font-weight: bold;
  font-size: 42rpx;
  text-align: center;
  color: #212934;
  line-height: 1.5;
}
</style>
