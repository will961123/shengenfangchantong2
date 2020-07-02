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
// Vue.prototype.apiUrl = 'http://192.168.0.111:8075/mobile'
// Vue.prototype.uploadUrl = 'http://192.168.0.111:8075/mobile'

Vue.prototype.apiUrl = 'https://fangchantong.hnshengen.com/mobile'
Vue.prototype.uploadUrl = 'https://fangchantong.hnshengen.com/mobile'
// #endif


// #ifdef MP-WEIXIN
Vue.prototype.appId = 'wx0d059ba3c0d019a3' 
// #endif
