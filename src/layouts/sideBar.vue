<template>
  <div class="sidebar">
    <el-row class="tac">
      <el-col>
        <el-menu :default-active="defaultIndex" class="el-menu-vertical-demo" mode="vertical" :router="true">
          <el-menu-item index="/export">
            <!-- <i class="el-icon-menu"></i> -->
            <span slot="title">导出待签名交易文件至U盘</span>
          </el-menu-item>
          <el-menu-item index="/audit">
            <!-- <i class="el-icon-document"></i> -->
            <span slot="title">审计与交易广播</span>
          </el-menu-item>
          <el-menu-item index="/records">
            <!-- <i class="el-icon-setting"></i> -->
            <span slot="title">交易记录</span>
          </el-menu-item>
          <el-menu-item index="/instruction">
            <!-- <i class="el-icon-setting"></i> -->
            <span slot="title">流程说明</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import './sideBar.css'

export default {
  props: {
    defaultIndex: String
  },
  // name: "sidebar",
  methods: {}
}
</script>
