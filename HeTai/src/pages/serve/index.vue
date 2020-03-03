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

    <van-cell title="| 咨询服务" size="large" is-link value="更多" @click="tomore(2)" />
    <div class="top">
      <div class="box" v-for="(item,index) in doctor" :key="index">
        <img :src="body" mode="widthFix" />
        <div class="infor">
          <p>姓名{{index+1}}</p>
          <p>在职医院{{index+1}}</p>
          <p>职业{{index+1}}</p>
        </div>
      </div>
    </div>

    <van-cell title="| 预约服务" size="large" />
    <button v-if="clean" class="yuyue" @click="canser">取 消 预 约</button>
    <button v-else class="yuyue" @click="save">保 存 预 约</button>
    <div class="down">
      <!-- 日历选择 -->
      <Calendar
        id="calendar"
        @select="select"
        ref="calendar"
        @selectMonth="selectMonth"
        @selectYear="selectYear"
        :value="DataValue"
        lunar
        range
        rangeMonthFormat="yyyy年MM月"
      />

      <!-- 弹出框 -->
      <van-popup :show="show" position="bottom" custom-style="height: 45%;" @close="onClose">
        <!-- 时间选择 -->
        <!-- 开始时间的弹框 -->
        <van-datetime-picker
          v-if="choose"
          type="time"
          :value="Start"
          @confirm="onStartDateConfirm"
          @cancel="onClose"
          visible-item-count="5"
        />
        <!-- 结束时间的弹框 -->
        <van-datetime-picker
          v-else
          type="time"
          :value="End"
          @confirm="onEndDateConfirm"
          @cancel="onClose"
          visible-item-count="5"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import Calendar from "mpvue-calendar";
import "mpvue-calendar/src/style.css";
export default {
  data() {
    return {
      doctor: [{}, {}],
      show: false,
      body: "",
      openid: "",
      DataValue: [],
      Starttime: {
        year: "",
        month: "",
        day: "",
        time: ""
      },
      Endtime: {
        year: "",
        month: "",
        day: "",
        time: ""
      },
      Start: "",
      End: "",
      clean: false,
      // true表示开始日期的时间框，false表示结束日期的时间弹窗
      choose: true
    };
  },
  components: {
    Calendar
  },

  methods: {
    toMy() {
      const url = "../my/main";
      wx.navigateTo({ url });
    },
    tomore(e) {
      const url = "../subjectmore/main?id=" + e;
      wx.navigateTo({ url });
    },
    onStartDateConfirm(e) {
      this.show = false;
      this.Starttime.time = e.mp.detail;
    },
    onEndDateConfirm(e) {
      this.show = false;
      this.Endtime.time = e.mp.detail;
    },
    // 选择月份事件的回调方法，month为选中的月份，year为选中的年份
    selectMonth(month, year) {
      console.log(year, month);
    },
    // 选择年份事件的回调方法，year为选中的年份
    selectYear(year) {
      console.log(year);
    },
    // 日期选中事件的回调方法,在range模式下val为开始日期、val2为结束日期，非range模式下val为选中日期，val2为日期信息
    select(val, val2) {
      this.show = true;
      if (val2 != undefined) {
        this.Starttime.year = val[0];
        this.Starttime.month = val[1];
        this.Starttime.day = val[2];
        this.Endtime.year = val2[0];
        this.Endtime.month = val2[1];
        this.Endtime.day = val2[2];
        this.choose = false;
      } else {
        this.choose = true;
      }
    },
    onClose() {
      this.show = false;
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
        console.log(e);
        that.globalData.userInfo = e.mp.detail.userInfo;
        that.toMy();
      } else {
        //用户按了拒绝按钮
        console.log("用户按了拒绝按钮");
      }
    },
    getuser() {
      let that = this;
      wx.cloud.callFunction({
        // 云函数名称
        name: "getOpenid",
        // 传给云函数的参数
        // data: {
        //   a: 1,
        //   b: 2
        // },
        success: function(res) {
          let openid = res.result.openid; // 3
          that.openid = openid;
          // that.setData({
          //   openid:openid
          // })
        },
        fail: console.error
      });
    },
    save() {
      this.clean = true;
      var that = this;
      const db = wx.cloud.database();
      db.collection("yuyue").add({
        data: {
          Startyear: that.Starttime.year,
          Startmonth: that.Starttime.month,
          Startday: that.Starttime.day,
          Starttime: that.Starttime.time,
          Endyear: that.Endtime.year,
          Endmonth: that.Endtime.month,
          Endday: that.Endtime.day,
          Endtime: that.Endtime.time
        },
        success: function(res) {
          wx.showToast({
            title: "预约成功"
          });
        },
        fail: err => {
          that.canser();
          wx.showToast({
            title: "预约失败"
          });
          console.log(err);
        }
      });
    },
    canser() {
      (this.Start = ""), (this.End = "");

      this.Starttime.year = "";
      this.Starttime.month = "";
      this.Starttime.day = "";
      this.Starttime.time = "";

      this.Endtime.year = "";
      this.Endtime.month = "";
      this.Endtime.day = "";
      this.Endtime.time = "";

      this.clean = false;
      var that = this;
      const db = wx.cloud.database();

      db.collection("yuyue")
        .where({ _openid: that.openid })
        .remove({
          success: function(res) {
            wx.showToast({
              title: "取消预约成功"
            });
          },
          fail: err => {
            wx.showToast({
              title: "取消预约失败"
            });
            console.log(err);
          }
        });
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
    this.getuser();

    var that = this;
    const db = wx.cloud.database();
    db
      .collection("yuyue")
      .where({ _openid: that.openid })
      .get({
        success: function(res) {
          if (res.data[0] == undefined) {
            that.clean = false;
          } else {
            that.clean = true;
            let Startdata = [
              res.data[0].Startyear,
              res.data[0].Startmonth,
              res.data[0].Startday
            ];
            let Enddata = [
              res.data[0].Endyear,
              res.data[0].Endmonth,
              res.data[0].Endday
            ];
            that.DataValue = [Startdata, Enddata];
            that.Start = res.data[0].Starttime;
            that.End = res.data[0].Endtime;
          }
        },
        fail: err => {
          console.log(err);
        }
      });
  },
  created() {
    wx.cloud.getTempFileURL({
      fileList: [
        "cloud://flash-7b960a.666c-flash-7b960a-1257750062/body_ill.png"
      ],
      success: res => {
        this.body = res.fileList[0].tempFileURL;
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
  height: 120rpx;
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

.top {
  width: 100%;
  height: 380rpx;
  display: flex;
  flex-direction: column;
}

.down {
  width: 100%;
  height: 380rpx;
  position: relative;
  top: -50rpx;
}
.box {
  width: 90%;
  height: 160rpx;
  background-color: #deebf7;
  border-radius: 50rpx;
  margin: 20rpx 20rpx 20rpx 30rpx;
  display: flex;
  flex-direction: row;
}
.box img {
  width: 150rpx;
  border-radius: 50rpx;
  background-color: #1e4d78;
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

.yuyue {
  width: 180rpx;
  height: 60rpx;
  border-radius: 20rpx;
  font-size: 25rpx;
  font-weight: bold;
  position: relative;
  top: -75rpx;
  left: 260rpx;
}
</style>
