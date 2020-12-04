// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'

import myCharts from '@/comm/js/myCharts.js'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
import './assets/Iconfont/iconfont.css'
import animate from 'animate.css'
import materialIcons from 'material-design-icons/iconfont/material-icons.css'
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
import loading from 'vue-nice-loading'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/icon/iconfont.css'

import Viewui from 'view-design';
import 'view-design/dist/styles/iview.css';
import store from '@/vuex2/index'

fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.use(Viewui)
Vue.use(contentmenu)
Vue.use(myCharts)
Vue.use(VueAxios, axios)
Vue.use(loading)
Vue.use(ElementUI);
Vue.prototype.$axios=axios



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
