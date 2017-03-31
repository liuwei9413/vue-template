<template>
  <div class="pageHeader">
    <img src="../assets/vechain.png">
    <div class="nav-right">
      <div class="nav-item">
        <el-badge is-dot class="item">
          <i class="el-icon-message"></i>
        </el-badge>
        <el-badge class="item"><i class="el-icon-setting"></i></el-badge>
      </div>
      <div class="nav-item">
        <el-input placeholder="输入搜索信息"
                  icon="search"
                  v-model="input2">
        </el-input>
      </div>
      <div class="nav-item">
        <el-menu theme="dark"
                 :default-active="activeIndex"
                 class="el-menu-demo"
                 mode="horizontal"
                 :router="true">
          <el-menu-item index="user-center" :route="{name: 'hello'}">个人中心</el-menu-item>
          <el-submenu index="haed-menu">
            <template slot="title">Sherry</template>
            <el-menu-item index="haed-menu_management" :route="{name: 'hello'}">系统管理</el-menu-item>
            <el-menu-item @click="logout" index="">注销</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import './header.css'

export default {
  name: 'pageHeader',
  data() {
    return {
      activeIndex: '1',
      input2: ''
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    logout($e) {
      console.log($e)
      this.$router.push({name: 'login'})
    }
  }
}
</script>
