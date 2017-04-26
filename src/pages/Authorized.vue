<template>
  <div>
    <pageheader :default-index="defaultItem"
                :headmenus="headerItems"></pageheader>
    <pagesidebar :sidebar="sideItems"
                 :default-index="defaultItem"></pagesidebar>
    <div class="content-container">
      <transition name="fade">
        <router-view class="mp-height-add"></router-view>
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
      sideItems: {
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
              },
              {
                name: 'Element',
                path: { name: 'eledemo' }
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
      headerItems: {
        menus: [
          {
            name: '个人中心',
            path: { name: 'hello' }
          }, {
            name: 'Sharry',
            subItems: [
              {
                name: '系统设置',
                path: { name: 'hello' }
              }, {
                name: '注销',
                path: { name: 'login' }
              }
            ]
          }
        ]
      },
      defaultItem: ''
    }
  },
  created() {
    this.defaultItem = this.$route.name
  },
  watch: {
    $route() {
      this.defaultItem = this.$route.name
    }
  },
  components: {
    pageheader,
    pagefooter,
    pagesidebar
  }
}
</script>
