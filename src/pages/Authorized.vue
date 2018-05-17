<template>
  <div>
    <pageheader></pageheader>
    <pagesidebar :default-index="defaultItem"></pagesidebar>
    <div class="content-container">
      <transition name="fade">
        <router-view class="content"></router-view>
      </transition>
    </div>
    <!-- <pagefooter></pagefooter> -->
  </div>
</template>
<script>
import pageheader from '@/layouts/header.vue'
// import pagefooter from '@/layouts/footer.vue'
import pagesidebar from '@/layouts/sidebar.vue'

export default {
  data() {
    return {
      name: 'app',
      defaultItem: ''
    }
  },
  created() {
    this.defaultItem = this.$route.path
    // console.log(this.$route)
  },
  watch: {
    $route() {
      this.defaultItem = this.$route.path
    }
  },
  components: {
    pageheader,
    // pagefooter,
    pagesidebar
  }
}
</script>
