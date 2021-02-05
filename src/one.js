// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './one.vue'
import router from './router/one'



import Viewui from 'view-design';
import 'view-design/dist/styles/iview.css';
import { locale } from 'view-design';
import lang from 'view-design/dist/locale/en-US';
import VueWorker from 'vue-worker';

if (opener.useprameters.defaultLanguage!='zh-CN'){
locale(lang); 
}

Vue.use(Viewui)
Vue.use(VueAxios, axios)
Vue.prototype.$axios=axios
Vue.config.productionTip = false
Vue.use(VueWorker);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
 
})
