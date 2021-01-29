import Vue from 'vue'
import Router from 'vue-router'
import heatmap from '@/components/panel/Heatmap.vue'
import heatmap_geojson from '@/components/panel/heatmap_geojson.vue'

Vue.use(Router)

export default new Router({
  routes: [
     {
      path: '/',
      name: 'heatmap',
      component: heatmap,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },{
        path: '/heatmap_geojson',
        name: 'heatmap_geojson',
        component: heatmap_geojson,
        
      },
  
    
  ]
})
