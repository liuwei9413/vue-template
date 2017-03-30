import { Doughnut } from 'vue-chartjs/es'

export default Doughnut.extend({
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})
