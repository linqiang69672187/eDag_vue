<template>
<div class="vuetree">
      <Tree :data="BStreeval" show-checkbox></Tree>
</div>
</template>
<script>
import Vue from 'vue';
import { Tree  } from 'iview';
    export default {
        data () {
            return {
                BStreeval:[
                   
                      
                            {
                                title: '交换1',
                                expand: false,
                                
                                children: [
                                    {
                                        title: '基站 1-1-1',
                              
                                    },
                                    {
                                        title: '基站 1-1-2',
                                        
                                    }
                                ]
                            },
                            {
                                title: '交换2',
                                expand: false,
                              
                                children: [
                                    {
                                        title: '基站 1-2-1',
                                       
                                    },
                                    {
                                        title: '基站 1-2-1'
                                     
                                    }, {
                                        title: '基站 1-2-1',
                                       
                                    },
                                    {
                                        title: '基站 1-2-1'
                                     
                                    },
                                     {
                                        title: '基站 1-2-1',
                                       
                                    },
                                    {
                                        title: '基站 1-2-1'
                                     
                                    },
                                     {
                                        title: '基站 1-2-1',
                                       
                                    },
                                    {
                                        title: '基站 1-2-1'
                                     
                                    }
                                ]
                            }
                       
                   
                ],
                worker:null,
               
            }
        },
        mounted(){
           // this.loadTree();
        },
        destroyed() {
            // 通过赋值null的方式，释放掉worker引用，这样就可以关闭worker，这是作者在github上说的
            this.worker = null
            },
        components:{
           
        },
        methods: {
              loadTree(){
                  let _this =this;
                    Vue.axios.get('/Handlers/getBasestationForNewTree.ashx', { // ，/app/data/json/OnlineTerminalCountGroupByBS.json，/Handlers/MVCEasy.ashx，
                            params: {
                                L:'1',                                         
                            }
                          }).then((res) => {
                          console.info(res)
                         //   _this.workerThread(res.data);
                       
                          }).catch((err) => {
                          console.log(err)
                      
                   });  
             },
            workerThread(data){
            this.worker = this.$worker.run(n =>{
                n.forEach(element => {
                    console.log(element);
                });
            }, [data])
                // 数组中为传递给worker的参数，可以传递多个，此案例为2
                .then(res => console.log(res)) // res为worker计算结束return返回的结果数据，可以在.then里根据返回结果继续操作主线程后续任务
                .catch(e => console.log(e)) // 报错信
            }

        },
       
    }
    
</script>
<style scoped>

</style>