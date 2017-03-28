<template>
  <div class="pageHeader">
    <img src="../assets/vechain.png"
         style="height:16px;margin:13px 0 0 20px;">
    <div class="nav-right">
      <div class="nav-item">
        <el-badge is-dot
                  class="item">
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
                 @select="handleSelect"
                 router="true">
          <el-menu-item index="1">个人中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">Sherry</template>
            <el-menu-item index="2-1">系统管理</el-menu-item>
            <el-menu-item index="/signin">注销</el-menu-item>
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
    }
  }
}
</script>
