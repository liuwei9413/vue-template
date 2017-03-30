import { Bubble } from 'vue-chartjs/es'

export default Bubble.extend({
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})
