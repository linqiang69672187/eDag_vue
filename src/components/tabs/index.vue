<template>
<div :style="backgroundDiv" id="realstatustab"  class="row">
    <div id="onlinechar"></div>
    <div  class="middle"> 
        <div id="gauguchar"></div>
         <div class='loader-ring'>
            <div class='loader-ring-light'></div>
            <div class='loader-ring-track'></div>
        </div>
      </div>
    <div id="onlinechartable" class="right">
      

    </div>

     <div class="exportExcel"  >
      <span><Tooltip   :content="exporttext" placement="bottom"> 
       <i @click="toloadExcel" class="material-icons">move_to_inbox</i>
       </Tooltip>
      </span>
      <span>
      <Tooltip   content="download" placement="bottom"> 
       <a  :href="excelHerf" v-show="excelHerf!=''" target="_blank"> <i class="material-icons">link</i></a>
      </Tooltip>
      </span>
     </div>  
    
</div>
</template>
<script>
//import Table from "@/components/control/tables"
import {Tooltip} from 'iview';
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
                    updategaugeindex:null, 
                    updatedynamicline:null,
                    loadinter:null,
                   
                    loadingvue:null,  
                    exporttext:'生成EXCEL',
                    excelHerf:'', 
                    language:{
                     excelfail:'生成EXCEL失败',
                     excelsuccess:'生成EXCEL成功'
                    }                    
                }
        },
        components:{
         //Table
         Tooltip
        },
        props:['showdmenu','tabname'],
        methods: {
           updatedata(){
             this.updatedynamicline('111');
             this.updategaugeindex('111')
             this.updateecharbar('122');
           },
           interLoadData(){
             let _this = this;

             Vue.axios.get('/Handlers/MVCEasy.ashx', {  //--/app/data/json/devcie.json-/Handlers/MVCEasy.ashx
                            params: {
                                ctrl:'DialPadDao',
                                action: "GetTerminalOnlineInfo",
                                times:new Date().getTime(),
                            }
                          }).then((res) => {
                          console.info(res);
                          
                          _this.praseData(res.data); 
                          }).catch((err) => {
                          console.log(err)
                           
                   })

           },
          praseData(data){
          
           
           let onlinetime=parseFloat(data[data.length-1].onlineTime);
           let onlinecount=parseInt(data[data.length-1].onlineTerminal);
           let deviececount=parseInt(data[data.length-1].allTerminal);
          //  data.forEach((item)=>{   
          //               onlinetime+=parseInt(item.onlineTime);
          //               onlinecount+=parseInt(item.onlineTerminal);
          //               deviececount+=parseInt(item.allTerminal);    
          //           });

           this.updatedynamicline(onlinetime,onlinecount);
           this.updategaugeindex(onlinecount,deviececount);
           this.updateecharbar(data);
          },
          toloadExcel(){
          
             this.loadingvue = this.$loading({
              text: 'loading',
              target: '#realstatustab'
            });
            let _this=this;
            this.excelHerf='';
            Vue.axios.get('/Handlers/ExportExcel.ashx', {  //--/app/data/json/exportEntityGPSreport.json-/Handlers/MVCEasy.ashx
                            params: {
                                ctrl:'entityGPS',
                                times:new Date().getTime(),
                            }
                          }).then((res) => {
                           console.info(res);
                          _this.loadingvue.close();
                          if(res.data==""){
                             _this.$emit("downloadover",'error',_this.language.excelfail);                  
                          }else{
                              _this.$emit("downloadover",'success',_this.language.excelsuccess); 
                          }
                          _this.excelHerf="userfiles/"+res.data;
                          //_this.exporttext="重新生成EXCEL";
                          }).catch((err) => {
                           console.info(err);
                             _this.loadingvue.close();
                           //window.vue_notice.err('error',err);
                           _this.$emit("downloadover",'error',_this.language.excelfail); 
                   })
          },
          setlanguage(){
             this.exporttext=GetTextByName('Lang_ExportToExcel');
             this.language={ excelfail:GetTextByName('Operationfails'),excelsuccess:GetTextByName('OperationSuccessful')};
             let onlinetime = GetTextByName('onlinetime');
             let onlinecount = GetTextByName('onlinecount');
             this.updatedynamicline(0,0,onlinetime,onlinecount); 

             let zxzb = GetTextByName('Lang_online');
             let zxl = GetTextByName('onlinepercentage');
             this.updategaugeindex(0,0,zxzb,zxl);
             this.updateecharbar(0,onlinetime,onlinecount);
           },
        },
         computed: {
            interStatus: function () {
                return this.showdmenu==true&&this.tabname=="realtime";
            },
          
          },
        created(){
          
        },
        destroyed() {
         clearInterval(this.loadinter);
        },
        mounted() {
          
        this.updatedynamicline = this.$chart.dynamicline('onlinechar');
        this.updategaugeindex = this.$chart.gaugeindex('gauguchar');
        this.updateecharbar = this.$chart.echarbar('onlinechartable');
    
        let _this=this;
        this.interLoadData();
        this.loadinter  = setInterval(function (){
              _this.interLoadData();
           
              }, 10000);
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
             clearInterval( this.loadinter);
           }

      }}
    }
</script>
<style scoped>

#onlinechar{
    width:calc(50% - 110px);
    height: 220px;
    color: #fff !important;
    float: left;
}
.middle,#gauguchar{
    width:220px;
    height: 220px;
    float: left; 
}

#onlinechartable{
    margin-top: 10px;
    width:calc(50% - 110px);
    height: 220px;
    color: #fff !important;
    float: right;
}
 .row{
         height: 220px;
         width: 100%;
         background:no-repeat no-repeat;;
         background-size: 100%;  
         color: #fff;
    }


.loader-ring {
  position: relative;
  top: 0;
  left: 0;
  margin:12px 0 0 12px;
  width: 198px;
  height: 198px;
}

.loader-ring-light {
  width: 198px;
  height: 198px;
  -moz-border-radius: 198px;
  -webkit-border-radius: 198px;
  border-radius: 198px;
  -moz-box-shadow: 0 4px 0 #B4FF0B inset;
  -webkit-box-shadow: 0 4px 0 #B4FF0B inset;
  box-shadow: 0 4px 0 #B4FF0B inset;
  animation: rotate-360 2s linear infinite;
}

.loader-ring-track {
  position: absolute;
  top: 0;
  left: 0;
  width: 198px;
  height: 198px;
  -moz-border-radius: 198px;
  -webkit-border-radius: 198px;
  border-radius: 198px;
  -moz-box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.3) inset;
  -webkit-box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.3) inset;
  box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.3) inset;
}

@keyframes rotate-360 {
  from {
    -moz-transform: rotate(0);
    -ms-transform: rotate(0);
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  to {
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.exportExcel{
  right: 100px;
  color: #fff;
  width: 60px;
  height: 40px;
  position:absolute;
  line-height: 40px;
  font-size: 22px;
  cursor: pointer;
  margin-top: 10px;
}
.exportExcel a{
  color: #fff;
}

</style>
<style >

</style>