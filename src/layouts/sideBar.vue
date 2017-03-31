<template>
  <div class="sidebar">
    <el-row class="tac">
      <el-col>
        <h4>{{sidebar.title}}</h4>
        <el-menu :default-active="defaultIndex"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 theme="dark"
                 :router="true">
          <template v-for="(item, i) in sidebar.menus">
            <el-submenu v-if="item.subItems && item.subItems.length"
                        :index="'sidebar-' + i">
              <template slot="title">
                <i :class="item.iconClass || 'el-icon-menu'"></i>{{item.name}}
              </template>
              <el-menu-item v-for="(citem, cindex) in item.subItems"
                            :key="item.id"
                            :index="'sidebar-' + i + '-' + cindex"
                            :route="citem.path">{{citem.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else
                          :index="'sidebar-' + i"
                          :route="item.path"><i :class="item.iconClass || 'el-icon-menu'"></i>{{item.name}}</el-menu-item>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import './sideBar.css'
export default {
  props: {
    sidebar: {
      type: Object,
      validator: function (sidebar) {
        let result = true
        if (!('title' in sidebar)) {
          console.error('required title in sidebar')
          result = false
        }
        if (!('menus' in sidebar) || !(sidebar.menus instanceof Array)) {
          console.error('required items(type Array) in sidebar')
          result = false
        }

        return result
      }
    },
    defaultIndex: String
  },
  created() {
    console.log(this.sidebar)
  },
  name: 'sidebar',
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
