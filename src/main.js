import './css/base.css'
import 'normalize.css'
import '../ele-theme/index.css'
import './css/el-overwrite.css'

import 'js-cookie'
import Vue from 'vue'
import router from './router'
import store from './vuex'
import ElementUI from 'element-ui'
import i18n from './i18n'

import App from './App'
import './config.js'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
window.MPApp = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
