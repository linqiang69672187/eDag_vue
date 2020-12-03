import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import News from '@/components/news.vue'
import test from '@/components/test.vue'
import heatmap from '@/components/panel/heatmap.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/heatmap',
      name: 'heatmap',
      component: heatmap
    },
  ]
})
