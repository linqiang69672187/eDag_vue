import { strategy } from "webpack-merge"

const mutations={
  singleCallDataPush(state,data){
    // data  
    // {
    //   title: 'singleCall',
    //   number: '10010007',
    //   name: '10010007',
    //   type: '普通单呼',
    //   department: '技侦支队',
    //   message: '123995呼叫挂断',
    //   sound: true,
    //   lock: true,
    //   show: true
    // }
    state.singleCallData.push(data)
  },
  calling_singleCallData_delete(state,number){
    for (let i = 0; i < state.calling_singleCallData.length; i++) {
      if (state.calling_singleCallData[i].number == number) {
          state.calling_singleCallData.splice(i,1)
            return
      }
    }
  },
  calling_numberListeningNow_clear(state){
    state.calling_numberListeningNow=''
  },
  calling_singleCallData_push(state,item){
    let numberNoRepeat = true
    for(let i in state.calling_singleCallData){
      if(state.calling_singleCallData[i].number==item.number){
        numberNoRepeat = false
        return
      }
    }
    if(numberNoRepeat){
      state.calling_singleCallData.push(item)
    }
  },
  calling_numberListeningNow_set(state,number){
    state.calling_numberListeningNow=number
  },
  calling_singleCallDataSave_push(state,item){
    let numberNoRepeat = true
    for(let i in state.calling_singleCallDataSave){
      if(state.calling_singleCallDataSave[i].number==item.number){
        numberNoRepeat = false
        return
      }
    }
    if(numberNoRepeat){
      state.calling_singleCallDataSave.push(item)
    }
  },
  calling_singleCallDataSave_delete(state,number){
    for (let i = 0; i < state.calling_singleCallDataSave.length; i++) {
      if (state.calling_singleCallDataSave[i].number == number) {
          state.calling_singleCallDataSave.splice(i,1)
            return
      }
    }
  },

  calling_sCallListeningNow_push(state,number){
    let numberNoRepeat = true
    for(let i in state.calling_sCallListeningNow){
      if(state.calling_sCallListeningNow[i].number==number){
        numberNoRepeat = false
        return
      }
    }
    if(numberNoRepeat){
      state.calling_sCallListeningNow.push(number)
    }
  },

  calling_sCallListeningNow_delete(state,number){
    for (let i = 0; i < state.calling_sCallListeningNow.length; i++) {
      if (state.calling_sCallListeningNow[i].number == number) {
          state.calling_sCallListeningNow.splice(i,1)
            return
      }
    }
  }

    //2020.10.14

}
export default mutations