import Vue from 'vue'
import http from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vue-swipe/dist/vue-swipe.css'

Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
