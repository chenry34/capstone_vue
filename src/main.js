import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)

Vue.prototype.$axios = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

import './assets/app.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
  
}).$mount('#app')
