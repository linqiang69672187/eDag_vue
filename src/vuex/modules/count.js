import {INCREASE} from '@/vuex/modul_types'
const state ={
    points:110,
    fu:'fu'
}
const getters ={
    get_points:state =>{
        return state.points
    }
}
const mutations ={
    [INCREASE](state,data){
        state.points += data
    }
}

const actions={
    [INCREASE](context,data){
        context.commit(INCREASE,data) //提交mutation
    }
}

export default{
    state,
    mutations,
    getters,
    actions
}