import Vue from 'vue'
// @ts-ignore
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

// @ts-ignore
const app = new Vue(App)
app.$mount()
wx.cloud.init({
  traceUser: true
})
Vue.prototype.globalData = getApp().globalData
