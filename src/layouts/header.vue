<template>
  <div class="pageHeader">
    <img src="../assets/vechain.png">
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
        <el-menu :default-active="defaultIndex"
                 class="el-menu-demo"
                 mode="horizontal"
                 theme="dark"
                 :router="true">
          <template v-for="(item, i) in headmenus.menus">
            <el-submenu v-if="item.subItems && item.subItems.length"
                        :index="'header-' + i">
              <template slot="title">{{item.name}}</template>
              <el-menu-item v-for="(citem, cindex) in item.subItems"
                            :key="item.id"
                            :index="citem.path.name"
                            :route="citem.path">{{citem.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else
                          :index="item.path.name"
                          :route="item.path">{{item.name}}</el-menu-item>
          </template>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import './header.css'

export default {
  name: 'pageHeader',
  props: {
    headmenus: {
      type: Object,
      validator: function (headmenus) {
        let result = true
        if (!('menus' in headmenus) || !(headmenus.menus instanceof Array)) {
          console.error('required items(type Array) in sidebar')
          result = false
        }
        return result
      }
    },
    defaultIndex: String
  },
  data() {
    return {
      input2: ''
    }
  },
  methods: {
    logout($e) {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
