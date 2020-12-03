import {UPDATE} from '@/vuex/modul_types'
const state ={
    id:'',
    made:'made'
}
const getters ={
    get_id:state =>{
        return state.id
    }
}
const mutations ={
    [UPDATE](state,data){
        state.id = data
    }
}

const actions={
    [UPDATE](context,data){
        context.commit(UPDATE,data) //提交mutation
    }
}

export default{
    state,
    mutations,
    getters,
    actions
}