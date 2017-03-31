<template>
  <center-layout width="400px"
                 height="172px">
    <section slot="content">
      <p class="number danger">500</p>
      <p class="h3">HTTP is wrong!</p>
    </section>
  </center-layout>
</template>

<script>
import './errorPage.css'

import { centerLayout } from '@/components/layouts'
export default {
  name: 'page_error',
  components: {
    centerLayout
  }
}
</script>
