<template>
  <el-row :gutter="24">
    <el-col class="cus-status" :gutter="10" :sm="12" :md="6" :lg="6" :xs="12"
            v-for="(status,index) in list"
            :key="status.index">
      <div class="status"
           :class="status.class">
        <p class="num">{{status.num}}</p>
        <p class="title">{{status.title}}</p>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import './status.css'
export default {
  name: 'status',
  props: {
    list: Array
  }
}
</script>

