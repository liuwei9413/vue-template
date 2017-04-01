import Vue from 'vue'
import Vuex from 'vuex'

import charts from './modules/charts'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    charts
  },
  strict: debug
})
