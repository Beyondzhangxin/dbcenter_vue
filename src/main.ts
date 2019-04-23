import Vue from 'vue'
import App from '@/App'
import router from './router'
import store from './store'

Vue.config.productionTip = false
require('@/assets/font/iconfont.js');

// Vue.use(BaiduMap, {
//   /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
//   ak: '5lz3TYLf6N63EkDxfRkfpV8wpjlqmWt0'
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
