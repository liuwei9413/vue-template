import './css/base.css'
import 'normalize.css'
import '../ele-theme/index.css'
import './css/el-overwrite.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './config.js'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
