import './css/base.css'
import 'normalize.css'
import '../ele-theme/index.css'
import './css/el-overwrite.css'

// import 'js-cookie'
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import api from './api/serviceConfig'

import App from './App'
import './config.js'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$axios = api

/* eslint-disable no-new */
window.MPApp = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
