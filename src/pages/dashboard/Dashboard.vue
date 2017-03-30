<template>
  <div>
    <el-breadcrumb :separator="mpConfig.separator">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>控制台</el-breadcrumb-item>
    </el-breadcrumb>
    <section class="row">
      <sec-title title="统计块"></sec-title>
      <status :list="statusData"></status>
    </section>
    <section class="row">
      <el-row :gutter="24">
        <el-col :xs="24"
                :sm="24"
                :md="12">
          <sec-title title="统计块"></sec-title>
          <bar-chart :data="chartDatas.bar"
                      :options="chartOpts.bar"
                      :height="200"></bar-chart>
        </el-col>
        <el-col :xs="24"
                :sm="24"
                :md="12">
          <sec-title title="统计块"></sec-title>
          <line-chart :data="chartDatas.line2"
                      :options="chartOpts.line2"
                      :height="200"></line-chart>
        </el-col>
      </el-row>
    </section>
    <section class="row">
      <el-row :gutter="24">
        <el-col :xs="24"
                :sm="24"
                :md="12">
          <sec-title title="统计块"></sec-title>
          <line-chart :data="chartDatas.line"
                      :options="chartOpts"
                      :height="200"></line-chart>
        </el-col>
        <el-col :xs="24"
                :sm="24"
                :md="12">
          <sec-title title="统计块"></sec-title>
          <pie-chart :data="chartDatas.pie"
                      :height="200"></pie-chart>
        </el-col>
      </el-row>
    </section>
  </div>
</template>
<script>
import statusData from '@/mockDatas/status.json'
import lineData from '@/mockDatas/line.json'
import line2Data from '@/mockDatas/line2.json'
import barData from '@/mockDatas/bar.json'
import pieData from '@/mockDatas/pie.json'

import charts from '@/components/charts'
import status from '@/components/status.vue'
import secTitle from '@/components/title.vue'

/** chart elements
 *   lineChart,
 *   pieChart,
 *   barChart,
 *   bubbleChart,
 *   doughnutChart,
 *   radarChart
 */
export default {
  name: 'dashboard',
  components: {
    ...charts,
    status,
    secTitle
  },
  data() {
    return {
      chartDatas: {
        line: lineData.data,
        bar: barData.data,
        line2: line2Data.data,
        pie: pieData.data
      },
      chartOpts: {
        line: lineData.options,
        bar: barData.options,
        line2: line2Data.options
      },
      statusData
    }
  }
}
</script>
