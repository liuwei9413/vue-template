import { Pie } from 'vue-chartjs/es'

export default Pie.extend({
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})
