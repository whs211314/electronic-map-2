import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Dashboard from '@/views/dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    }
  ]
})
