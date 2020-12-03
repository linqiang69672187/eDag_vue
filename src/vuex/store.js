import Vue from 'vue'
import Vuex from 'vuex'

import counter from '@/vuex/modules/count'
import lockdevice from '@/vuex/modules/lockdevice'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !=='production'
export default new Vuex.Store({
    modules:{
        counter,
        lockdevice
    },
    strict:debug,
    middlewares:[]
})