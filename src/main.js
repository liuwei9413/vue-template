import './css/base.css'
import 'normalize.css'
import '../ele-theme/index.css'
import './css/el-overwrite.css'

import 'js-cookie'
import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import store from './vuex'
import ElementUI from 'element-ui'

import App from './App'
import './config.js'

Vue.use(ElementUI)
Vue.use(VueResource)

Vue.config.productionTip = false

// set the API root so we can use relative url's in our actions.
Vue.http.options.root = 'http://localhost:3000'

// Vue.http.headers.common['Authorization'] = 'asdf';
// Vue.http.headers.common['Authorization'] = window.Cookies.get('token');

/* eslint-disable no-new */
window.MPApp = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
