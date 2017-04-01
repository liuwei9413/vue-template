<template>
  <div>
    <el-breadcrumb :separator="mpConfig.separator">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>控制台</el-breadcrumb-item>
    </el-breadcrumb>
    <section class="row">
      <section-title title="统计块"></section-title>
      <status-card :list="statusData"></status-card>
    </section>
    <section class="row">
      <el-row :gutter="24">
        <el-col :xs="24"
                :sm="24"
                :md="12">
          <section-title title="柱状图"></section-title>
          <bar-chart :data="chartDatas.bar"
                     :options="chartOpts.bar"
                     :height="200"></bar-chart>
        </el-col>
        <el-col :xs="24"
                :sm="24"
                :md="12">
          <section-title title="折线图"></section-title>
          <line-chart v-if="chartDatas.line2" :data="chartDatas.line2"
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
          <section-title title="面积图"></section-title>
          <line-chart :data="chartDatas.line"
                      :options="chartOpts"
                      :height="200"></line-chart>
        </el-col>
        <el-col :xs="24"
                :sm="24"
                :md="12">
          <section-title title="饼图"></section-title>
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
import barData from '@/mockDatas/bar.json'
import pieData from '@/mockDatas/pie.json'

import { lineChart, barChart, pieChart } from '@/components/charts'
import { statusCard, sectionTitle } from '@/components/layouts'

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
    lineChart,
    barChart,
    pieChart,
    statusCard,
    sectionTitle
  },
  data() {
    return {
      chartDatas: {
        line: lineData.data,
        bar: barData.data,
        line2: '',
        pie: pieData.data
      },
      chartOpts: {
        line: lineData.options,
        bar: barData.options,
        line2: ''
      },
      statusData
    }
  },
  created() {
    let _this = this
    _this.$store.dispatch('charts/LINE_DATA').then((resp) => {
      // _this.chartDatas.line = resp.data
      console.log(resp)
      _this.$set(_this.chartDatas, 'line2', resp.data)
      _this.$set(_this.chartOpts, 'line2', resp.options)
    })
  }
}
</script>
