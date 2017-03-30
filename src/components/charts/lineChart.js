import { Line } from 'vue-chartjs/es'

export default Line.extend({
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})
