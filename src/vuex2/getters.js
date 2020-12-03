const getters={
    //getters不会修改Store中的原数据
    showNum(state){
        return state.count+state.count
    },
    languageEnglishTrue(state){
      if(state.gisLanguage=='English'){
        return true
      }else{
        return false
      }
    },
    calling_singleCallDataLength_get(state){
      return state.calling_singleCallData.length
    },
    calling_judging(state,number){
      if(state.calling_numberListeningNow==number){
        return true
      }
      else
        return false
    },
    calling_sCallListeningNowLength_get(state){
      return state.calling_sCallListeningNow.length
    }

    
}
export default getters