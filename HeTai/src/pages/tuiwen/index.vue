<template>
 <div>
    <!-- <official-account style="position:absolute;top:0;width:81%;height:168rpx;border:1rpx solid black;"></official-account> -->
  <div v-for="(item,index) in tuiwen" :key="index" class="tuiwen" @click="toweb(item.url)">
    <img :src="img" mode="widthFix" />
        <div class="infor">
          <p>重磅来袭！“和态”驾到~</p>
          <p>做体态康复，我们是认真的！</p>
        </div>
  </div>
 </div>
</template>

<script>
export default {
  data(){
    return {
      tuiwen:[
        {url:"https://mp.weixin.qq.com/s/beN6RWccamZB8Zu5GplKoQ"}
      ],
      img:""
    }
  },
  methods:{
    toweb(e){
      const url = "../web/main?id=" +e;
      wx.navigateTo({ url });
    }
  },
  created() {
    wx.cloud.getTempFileURL({
      fileList: ["cloud://flash-7b960a.666c-flash-7b960a-1257750062/logo.png"],
      success: res => {
        this.img=res.fileList[0].tempFileURL
      },
      fail: err => {
        console.log(err);
      }
    });
  }
}
</script>

<style scoped>
.tuiwen{
  width: 90%;
  height: 260rpx;
  margin: 10rpx 10rpx 10rpx 35rpx;
  border-radius: 35rpx;
  border: 1rpx solid #1e4d78;
  display: flex;
  flex-direction: row;
}
.tuiwen img {
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
  margin-top: 45rpx;
  width: 100%;
  height: 40rpx;
}
.infor p:last-child {
  margin-top: 45rpx;
  width: 100%;
  height: 40rpx;
  font-size: 27rpx;
  color: gray;
}
</style>
