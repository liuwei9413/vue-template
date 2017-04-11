<template>
  <div class="hello" v-loading="loading">
    hello massage <span>{{msg}}</span>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      loading: true
    }
  },
  created() {
    let _t = this
    setTimeout(function () {
      _t.msg = '99999999'
      _t.loading = false
    }, 2000)
  }
}
</script>
