<template>
  <div>
    <div>this is dashbord</div>
    <line-chart :data="chartDatas.line" :options="chartOpts"
                :height="200"></line-chart>
  </div>
</template>
<script>
import charts from '@/components/charts'
import lineData from '@/mockDatas/line.json'
export default {
  name: 'dashboard',
  components: {
    ...charts
  },
  data() {
    return {
      chartDatas: {
        line: lineData
      },
      chartOpts: {
        responsive: true,
        maintainAspectRatio: true
      }
    }
  }
}
</script>
