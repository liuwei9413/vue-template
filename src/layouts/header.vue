<template>
  <div class="page-header">
    <h2>VET换币服务</h2>
    <!-- <span class="logout">退出</span> -->
    <el-button class="logout" type="text" @click="logout()">退出</el-button>
    <span class="username">Hi [{{username}}]</span>
  </div>
</template>

<script>
import './header.css'
import {getStorage, removeStorage} from '@/utils'

export default {
  name: 'pageHeader',
  props: {
  },
  data() {
    return {
      username: getStorage('username')
    }
  },
  methods: {
    logout() {
      this.$axios.logout()
        .then((res) => {
          removeStorage('username')
          this.$router.push({ name: 'login' })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
