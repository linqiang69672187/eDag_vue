const state = {
  singleCallData: [
    {  
    title: '单呼',
    number: '10010001',
    name: '10010001',
    type: '全双工单呼',
    department: '技侦支队',
    message: '123995呼叫挂断',
    sound: true,
    lock: true,
    },
    {
      title: '单呼',
      number: '10010002',
      name: '10010002',
      type: '全双工单呼',
      department: '警察支队',
      message: '123995呼叫挂断',
      sound: true,
      lock: true,
    },
    {
      title: 'singleCall',
      number: '10010003',
      name: '10010003',
      type: '半双工单呼',
      department: '警察支队',
      message: '123995呼叫挂断',
      sound: true,
      lock: true,
    },
    {
      title: 'singleCall',
      number: '10010004',
      name: '10010004',
      type: '半双工单呼',
      department: '警察支队',
      message: '123995呼叫挂断',
      sound: true,
      lock: true,
    },
    {
      title: 'singleCall',
      number: '10010005',
      name: '10010005',
      type: '全双工单呼',
      department: '警察支队',
      message: '123995呼叫挂断',
      sound: true,
      lock: true,
    },
  ],
  aaaa:'aaaa',
  calling_numberListeningNow:'',//正在接听的全双工单呼呼叫号码
  calling_sCallListeningNow:[],//存放 正在接听的半双工单呼号码 的数组
  calling_singleCallData:[//存放 待处理or正在接听的半双工/全双工消息对象 的数组
    {  
      title: '单呼',
      number: '10010001',
      name: '10010001',
      type: '全双工单呼',
      department: '技侦支队',
      message: '123995呼叫挂断',
      sound: true,
      lock: true,
      eventtype:'01'
      },
      {
        title: '单呼',
        number: '10010002',
        name: '10010002',
        type: '全双工单呼',
        department: '警察支队',
        message: '123995呼叫挂断',
        sound: true,
        lock: true,
        eventtype:'01'

      },
      {
        title: 'singleCall',
        number: '10010003',
        name: '10010003',
        type: '半双工单呼',
        department: '警察支队',
        message: '123995呼叫挂断',
        sound: true,
        lock: true,
      eventtype:'00'

      },
      {
        title: 'singleCall',
        number: '10010004',
        name: '10010004',
        type: '半双工单呼',
        department: '警察支队',
        message: '123995呼叫挂断',
        sound: true,
        lock: true,
      eventtype:'00'

      },
      {
        title: 'singleCall',
        number: '10010005',
        name: '10010005',
        type: '全双工单呼',
        department: '警察支队',
        message: '123995呼叫挂断',
        sound: true,
        lock: true,
      eventtype:'01'

      }
  ],
  calling_singleCallDataSave:[],//存放 拨入过的消息对象 的数组
  calling_groupCallData:[],//存放 待处理or正在接听的组呼消息对象 的数组
  
}
export default state