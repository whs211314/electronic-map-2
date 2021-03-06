import Vue from 'vue'
import Toasted from 'vue-toasted'
import http from './http'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vue-swipe/dist/vue-swipe.css'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: 'O6GKe9A0L4xThRNPHotMrd5YpYlKotDY'
})

Vue.use(Toasted, { position: 'top-center', duration: 3000 })

Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
