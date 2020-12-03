<template>
<div :style="backgroundDiv"  class="row">
    
    <div id="Basestationchart" class="right">
      

    </div>
       
</div>
</template>
<script>
//import Table from "@/components/control/tables"
import Vue from 'vue';
import { setTimeout } from 'timers';
  export default {
        data () {
                return {
                     loading:true, 
                     backgroundDiv: {
                            backgroundImage: 'url(' + require('@/assets/images/tabs_table_bg.jpg') + ')'
                    } ,
                    updateecharbar:null,
                 
                    loadinter:null,                       
                }
        },
        props:['showdmenu','tabname'],
        computed: {
            interStatus: function () {
                return this.showdmenu==true&&this.tabname=="basestationchart";
            },
          
          },
        components:{
         //Table
        },
        methods: {
           
           interLoadData(){
             let _this = this;
              Vue.axios.get('/Handlers/MVCEasy.ashx', { // ，/app/data/json/OnlineTerminalCountGroupByBS.json，/Handlers/MVCEasy.ashx，
                            params: {
                                ctrl:'DialPadDao',
                                action: "OnlineTerminalCountGroupByBS",
                                times:new Date().getTime(),
                            }
                          }).then((res) => {
                           
                          _this.praseData(res.data); 
                          }).catch((err) => {
                          console.log(err)
                           
                   })

           },
          praseData(data){
          
           
           let onlinetime=0;
           let onlinecount=0;


           this.updateecharbar(data);
          },

         setlanguage(){

             let onlinecount = GetTextByName('onlinecount');
             this.updateecharbar(0,onlinecount); 

        }
           
        },
        created(){
          
        },
        destroyed() {
         clearInterval(this.loadinter);
        },
        mounted() {
        this.updateecharbar = this.$chart.Basestationecharbar('Basestationchart');
        }, 
        watch:{
         interStatus:function(newval,oldval){
           if (newval){
              let _this=this;
              this.interLoadData();
              this.loadinter  = setInterval(function (){
                    _this.interLoadData();
           
              }, 10000);
           }
           else{
             clearInterval(this.loadinter);
           }

      }}
    }
</script>
<style scoped>

#Basestationchart{
    width:100%;
    height: 220px;
    color: #fff !important;
    float: left;
}

 .row{
         height: 220px;
         width: 100%;
         background:no-repeat no-repeat;;
         background-size: 100%;  
         color: #fff;
    }

</style>
<style >

</style>