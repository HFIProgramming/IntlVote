// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'mdui/dist/css/mdui.min.css'
import 'mdui/dist/js/mdui.min.js'
import mdui from 'mdui'
var moment = require('moment')
moment.locale('zh-cn')

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.prototype.$mdui = mdui
Vue.prototype.$moment = moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})

console.log('你居然发现了这里！OwO，快来了解一下我们吧，我们欢迎你的加入👏。Github：https://github.com/hfiprogramming，公众号HFIProgramming')
console.log('%c', "padding:120px 200px;line-height:300px;background:url('https://static.hfi.me/images/club/hfiprogramming_qrcode.jpg') no-repeat;")
