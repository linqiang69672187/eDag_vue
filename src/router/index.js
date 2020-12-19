import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import Mainmap from '@/components/panel/Mainmap'
import test from '@/components/test.vue'
import heatmap from '@/components/panel/Heatmap.vue'
import toolBox from '@/components/control/toolBox.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        keepAlive: true // 需要被缓存
      }
  
    },
    {
      path: '/Mainmap',
      name: 'Mainmap',
      component: Mainmap
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/heatmap',
      name: 'heatmap',
      component: heatmap,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/toolBox',
      name: 'toolBox',
      component: toolBox
    },
  ]
})
