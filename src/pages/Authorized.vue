<template>
  <div>
    <pageheader></pageheader>
    <pagesidebar :sidebar="menuItems" :default-index="itemTest"></pagesidebar>
    <div class="content-container">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
    <pagefooter></pagefooter>
  </div>
</template>
<script>
import pageheader from '@/layouts/header.vue'
import pagefooter from '@/layouts/footer.vue'
import pagesidebar from '@/layouts/sidebar.vue'

export default {
  data() {
    return {
      name: 'app',
      menuItems: {
        title: 'Portal',
        menus: [
          {
            name: 'Dashboard',
            path: { name: 'dashboard' },
            iconClass: 'el-icon-warning'
          },
          {
            name: 'Demos',
            subItems: [
              {
                name: 'Hello',
                path: { name: 'hello' }
              }
            ],
            iconClass: 'el-icon-message'
          }, {
            name: '404',
            path: { name: 'notFound' },
            iconClass: 'el-icon-warning'
          }, {
            name: '500',
            path: { name: 'errorPage' },
            iconClass: 'el-icon-warning'
          }
        ]
      },
      itemTest: 'sidebar-0'
    }
  },
  components: {
    pageheader,
    pagefooter,
    pagesidebar
  }
}
</script>
