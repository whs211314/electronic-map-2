import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Dashboard from '@/views/dashboard'
import BDMap from '@/components/BDMap'

Vue.use(Router)

export default new Router({
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
    }, {
      path: '/test',
      component: BDMap
    }
  ]
})
