import Vue from 'vue'
import Router from 'vue-router'
import Authorized from '@/pages/Authorized.vue'
import Unauthorized from '@/pages/Unauthorized.vue'
// routes
import DemoRoutes from '@/pages/demos/routes.js'
import DashboardRoutes from '@/pages/dashboard/routes.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Unauthorized
    },
    {
      name: 'authorized',
      path: '/',
      redirect: {
        name: 'dashboard'
      },
      component: Authorized,
      children: [
        ...DemoRoutes,
        DashboardRoutes
      ]
    }
  ]
})

// router.afterEach(route => {
//   window.MPApp.$emit('router-changed-for-menu', {name: route.name})
// })

export default router
