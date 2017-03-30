import { Radar } from 'vue-chartjs/es'

export default Radar.extend({
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})
