<template>
  <div>
    <!-- <web-view src="http://www.baidu.com"></web-view> -->
    <web-view :src="url" class="web"></web-view>
  </div>
</template>

<script>
export default {
  data(){
    return{
      url:"https://mp.weixin.qq.com/s/beN6RWccamZB8Zu5GplKoQ"
    }
  },
  mounted(){
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length-1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    var id = currentPage.options.id    //如果要获取url中所带的参数可以查看options
    this.url=id;
    console.log(currentPage.options.id)
  }
}
</script>

<style scoped>
.web{
  width: 100%;
  height: 500rpx;
}
</style>
