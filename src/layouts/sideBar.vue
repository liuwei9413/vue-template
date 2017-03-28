<template>
  <div class="sidebar">
    <p>Portal</p>
    <el-row class="tac">
      <el-col>
        <el-menu default-active="2"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 theme="dark"
                 router="true">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>点开我呀~</template>
            <el-menu-item index="/">Dashboard</el-menu-item>
            <el-menu-item index="/list">List</el-menu-item>
            <el-menu-item index="/form">Form</el-menu-item>
            <!--<template slot="title"><i class="el-icon-message"></i>导航一</template>
                        <el-menu-item-group>
                          <template slot="title">分组一</template>
                          <el-menu-item index="1-1" >选项1</el-menu-item>
                          <el-menu-item index="1-2" >选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                          <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                          <template slot="title">选项4</template>
                          <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>-->
          </el-submenu>
          <el-menu-item index="/404"><i class="el-icon-warning"></i>404</el-menu-item>
          <el-menu-item index="/500"><i class="el-icon-warning"></i>500</el-menu-item>
          <el-menu-item index="/signin"><i class="el-icon-menu"></i>signin</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import './sideBar.css'
export default {
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
