<template>
  <div class="hello">
    hello massage
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  beforeRouteEnter(to, from, next) {
    setTimeout(function() {
      next(vm => {
        vm.msg = '99999999'
      })
    }, 2000)
  }
}
</script>
