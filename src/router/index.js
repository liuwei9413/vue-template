import Vue from 'vue'
import Router from 'vue-router'
import Authorized from '@/pages/Authorized.vue'
import Unauthorized from '@/pages/Unauthorized.vue'
// routes
import DemoRoutes from '@/pages/demos/routes.js'
import DashboardRoutes from '@/pages/dashboard/routes.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'unauthorized',
      path: '/login',
      component: Unauthorized
    },
    {
      name: 'authorized',
      path: '/',
      component: Authorized,
      children: [
        ...DemoRoutes,
        DashboardRoutes
      ]
    }
  ]
})
