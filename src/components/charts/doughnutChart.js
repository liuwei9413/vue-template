import { Doughnut } from 'vue-chartjs/es'

export default {
  extends: Doughnut,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
}
