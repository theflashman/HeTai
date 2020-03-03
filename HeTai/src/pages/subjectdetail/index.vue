<template>
  <div>
    <div class="detail">
      <video :src="videoname" type="video/mp4" controls preload>
      </video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoname:''
    };
  },
  created() {
    wx.cloud.getTempFileURL({
      fileList: ["cloud://flash-7b960a.666c-flash-7b960a-1257750062/test.mp4"],
      success: res => {
        this.videoname=res.fileList[0].tempFileURL
      },
      fail: err => {
        console.log(err);
      }
    });
  }
};
</script>

<style scoped>
.detail{
  background-color: aquamarine;
  height: 1200rpx;
}
video{
  width: 719rpx;
  height: 405rpx;
  margin-left: 15rpx;
}
</style>
