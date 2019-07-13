import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Dashboard from '@/views/dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
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
