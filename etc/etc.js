import Vue from 'vue'


// var imgUrl1 = 'http://249c88c713.zicp.vip/'
// var imgUrl2 ='praise/uploadImg/basic/slide/'
// Vue.prototype.imgUrl = imgUrl1 + imgUrl2 
Vue.prototype.imgUrl = 'https://xcx.youle598.com/shen'

// #ifdef H5
Vue.prototype.apiUrl = '/h5api'
Vue.prototype.uploadUrl = '/h5upload'
// #endif
// #ifndef H5
Vue.prototype.apiUrl = 'http://192.168.0.111:8075/mobile'
Vue.prototype.uploadUrl = 'http://192.168.0.111:8075/mobile'
// #endif


// #ifdef MP-WEIXIN
Vue.prototype.appId = 'wx51fed674e0817015'
Vue.prototype.appScret = '6c6099dde5485fbc3b173d288a350325'
// #endif
