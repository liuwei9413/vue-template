import Vue from 'vue'
import Router from 'vue-router'
import Authorized from '@/pages/Authorized.vue'
import Unauthorized from '@/pages/Unauthorized.vue'
// routes
import DemoRoutes from '@/pages/demos/routes.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Unauthorized
    }, {
      name: 'authorized',
      path: '/',
      redirect: {
        name: 'dashboard'
      },
      component: Authorized,
      children: [
        ...DemoRoutes
      ]
    }
  ]
})

export default router
