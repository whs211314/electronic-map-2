import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Dashboard from '@/views/dashboard'
import Test from '@/components/ChartDeploy'

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
      component: Test
    }
  ]
})
