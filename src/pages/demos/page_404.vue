<template>
  <center-layout width="400px"
                 height="172px">
    <section slot="content">
      <p class="number danger">404</p>
      <p class="h3">Sorry！Page not found！</p>
    </section>
  </center-layout>
</template>

<script>
import './errorPage.css'

import { centerLayout } from '@/components/layouts'
export default {
  name: 'page_not_found',
  components: {
    centerLayout
  }
}
</script>
