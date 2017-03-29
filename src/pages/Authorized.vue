<template>
  <div>
    <pageheader></pageheader>
    <pagesidebar :sidebar="menuItems"></pagesidebar>
    <transition name="fade" mode="out-in">
      <router-view class="content-container"></router-view>
    </transition>
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
      }
    }
  },
  name: 'app',
  components: {
    pageheader,
    pagefooter,
    pagesidebar
  }
}
</script>
