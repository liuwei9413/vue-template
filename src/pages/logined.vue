<template>
  <div>
    <pageheader></pageheader>
    <pagesidebar></pagesidebar>
    <router-view></router-view>
    <pagefooter></pagefooter>
  </div>
</template>
<script>
import pageheader from '@/layouts/header.vue'
import pagefooter from '@/layouts/footer.vue'
import pagesidebar from '@/layouts/sidebar.vue'

export default {
  name: 'app',
  components: {
    pageheader,
    pagefooter,
    pagesidebar
  }
}
</script>
