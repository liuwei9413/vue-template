import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/pages/demos/Hello'
import Signin from '@/pages/Signin.vue'
import logined from '@/pages/logined.vue'
import DemoRoutes from '@/pages/demos/routes.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Signin
    },
    {
      name: 'loged',
      path: '/',
      component: logined,
      children: [
        DemoRoutes
      ]
    }
  ]
})
