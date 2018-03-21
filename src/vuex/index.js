import Vue from 'vue'
import Vuex from 'vuex'
import './serviceConfig.js'

// import charts from './modules/charts'
import login from './modules/login'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    login
  },
  strict: debug
})
