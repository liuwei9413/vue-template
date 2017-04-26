<template>
  <div class="hello" v-loading="loading">
    <div>
      <el-button type="primary" @click="changeLang()">{{$t('change')}}</el-button>
    </div>
    <p>hello massage <span>{{$t('hello')}}</span></p>
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
  },
  methods: {
    changeLang() {
      this.$i18n.locale = this.$i18n.locale === 'en' ? 'cn' : 'en'
    }
  }
}
</script>
