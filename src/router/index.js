import Vue from 'vue'
import Router from 'vue-router'
import Authorized from '@/pages/Authorized.vue'
import Unauthorized from '@/pages/Unauthorized.vue'
// routes
import RecordsRoutes from '@/pages/records/routes.js'
import AuditRoutes from '@/pages/audit/routes.js'
import ExportRoutes from '@/pages/export/routes.js'
import InstructionRoutes from '@/pages/instruction/routes.js'
// tools
import { getStorage } from '@/utils'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Unauthorized,
      beforeEnter: (to, form, next) => {
        let username = getStorage('username')
        if (username) {
          next({ name: 'authorized' })
        } else {
          next()
        }
      }
    },
    {
      name: 'Authorized',
      path: '/',
      redirect: {
        name: 'TransactionRecords'
      },
      component: Authorized,
      children: [
        ...RecordsRoutes,
        ...ExportRoutes,
        ...AuditRoutes,
        ...InstructionRoutes
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    let username = getStorage('username')
    if (username) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
})

export default router
