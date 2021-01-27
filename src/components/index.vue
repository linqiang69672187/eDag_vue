<template>
    <div id="main">
    <!-- <OCX></OCX>  -->
        <!-- <v-contextmenu ref="contextmenu" >
            <v-contextmenu-item @click="handleClick('拨号盘')">拨号盘</v-contextmenu-item>
            <v-contextmenu-item @click="handleClick">实时状况</v-contextmenu-item>

            <v-contextmenu-item divider></v-contextmenu-item>

            <v-contextmenu-submenu title="调度功能">
                <v-contextmenu-item @click="handleClick">菜单3</v-contextmenu-item>

                <v-contextmenu-item divider></v-contextmenu-item>

                <v-contextmenu-submenu title="子菜单">
                <v-contextmenu-item @click="handleClick">菜单5</v-contextmenu-item>
                </v-contextmenu-submenu>

                <v-contextmenu-item @click="handleClick">菜单4</v-contextmenu-item>

                <v-contextmenu-item :auto-hide="false">不自动关闭1</v-contextmenu-item>
                <v-contextmenu-item :auto-hide="false">不自动关闭2</v-contextmenu-item>
            </v-contextmenu-submenu>
            </v-contextmenu> -->
    <div class="top" :class="[isshowmini?'topMini':'']" >
        <banner ref="banner" :isshowmini="isshowmini" @Bannerselectedchange='Bannerselectedchange'></banner>
    </div>
    <div>

    <div >
    <Mainmap ref="Mainmap" ></Mainmap>
    <MapToolbox ref="maptoolbox" @fullscreen="fullscreen"></MapToolbox>
    <LeftToolbox  ref="leftToolbox" @daiplate="cldaiplate" :style="{bottom:dmenuszie}"></LeftToolbox>
     <!-- <toolBox class="toolbox" :class="{downtoolBox}" ref="toolBox"></toolBox>  -->
    </div>
 
    <!--<Map  class="map" v-contextmenu:contextmenu move-type="0"></Map>
    <Callbox :class="{hidedmenu}"></Callbox> 地图上呼叫按钮-->
    <notice ref="notice"></notice>

    </div>
    <div class="isSuccess">
        <!-- <el-button @click="ocxRegStatus=!ocxRegStatus"> toggle</el-button> -->
        <el-button v-show="ocxRegStatus" class="isSuccessButton2"  @mouseenter.native="isSuccessButton2Hover=true" @mouseleave.native="isSuccessButton2Hover=false" type="success" round icon="el-iconlianjie1" ref="successButton"></el-button>
        <el-button  ref="wewe" v-show="!ocxRegStatus" class="isSuccessButton2"   @mouseenter.native="isSuccessButton3Hover=true" @mouseleave.native="isSuccessButton3Hover=false" type="danger" round icon="el-iconlianjieduankai"></el-button>
        <transition name="el-fade-in-linear">
            <el-card class="isSuccessCard" v-show="isSuccessButton2Hover&&ocxRegStatus">
            <p>{{language.Control}} {{isSuccessCardContent.msg}}</p>
            <p>{{language.ControlNumber}}:{{isSuccessCardContent.ssi}}</p>
            <p>{{language.ControlRegisteredUsers}}:{{isSuccessCardContent.dispName}}</p>
            <p v-if="isSuccessCardContent.usename">{{language.LogonUser}}:{{isSuccessCardContent.usename}}</p>
            </el-card>
        </transition>
        <transition name="el-fade-in-linear">
            <el-card class="isSuccessCard" v-show="isSuccessButton3Hover">
            <p v-if="ocxRegStatus">{{language.Control}} {{isSuccessCardContent.msg}}</p>
            <p v-else>{{language.ControlNotRegistered}}</p>
            <p v-if="isSuccessCardContent.usename">{{language.LogonUser}}:{{isSuccessCardContent.usename}}</p>
            </el-card>
        </transition>
    </div>
        <div>
            <div class="left" :class="{hidedmenu}">
                <Lmenu  ref="lmenu"  :items='lmenuitems'></Lmenu>
            </div>

            <div class="bottom">
                <Dmenu ref="dmenu" :ocxRegStatus="ocxRegStatus" @downloadover="downloadover"  @listenchange="listenchangeDmenu"></Dmenu>
            </div>         
        </div>
    </div>
</template>
<script>
import banner from "@/components/banner"
import Vue from 'vue';
import Lmenu from "@/components/Lmenu"
import Dmenu from "@/components/Dmenu"
import MapToolbox from "@/components/MapToolbox"
import Callbox from "@/components/control/CallBox"
import notice from "@/components/control/notices"
import LeftToolbox from "@/components/control/LeftToolbox"
import OCX from "@/components/OCX"
import languageset from '@/mixin/languageset'
import Mainmap from '@/components/panel/Mainmap'
import toolBox from "@/components/control/toolBox"



export default {
    watch:{
        ocxRegStatus(){
            if(this.ocxRegStatus){
                this.isSuccessButton3Hover=false
            }
        }
    },
    data(){
        return{
            isSuccessButton2Hover:false,
            isSuccessButton3Hover:false,
            isSuccessCardContent:{
                msg:'',
                ssi:'',
                usename:'',
                dispName:''
            },
            language:{
                Control:'控件',
                ControlNumber:'控件号',
                ControlNotRegistered:'控件未注册',
                ControlRegisteredUsers:'控件注册用户',
                LogonUser:'登录用户'
            },
            hidedmenu:false,
            dmenuszie: '260px !important', 
            lmenuitems:[],
            lmenuitems1:[
                        {label:'操作窗口',icon:'gps_fixed',name:'hjmb',enable:true},
                        {label:'GPS上报',icon:'history',name:'gpslist',enable:true},
                        {label:'GPS漫游订阅',icon:'navigation',name:'GPSPullList',enable:true},
                        {label:'短信',icon:'mail_outline',name:'sms_sjx',enable:true},
                        {label:'操作日志',icon:'event_note',name:'operationlog',enable:true},
                        {label:'动态重组',icon:'group_add',name:'dtczrestlt',enable:true},
            ],
            lmenuitems2:[
                        {label:'GPS上报统计',icon:'insert_chart',name:'Lang_gpstj',enable:true},
                        {label:'单键报备统计',icon:'equalizer',name:'Lang_djbbtj',enable:true},
                        {label:'人员设备管理',icon:'supervisor_account',name:'Lang_UserDeviceManage',enable:true},
                       // {label:'GPS数据管理',icon:'assignment',name:'Lang_GPSDataManage',enable:true},
                        {label:'预案文档',icon:'build',name:'Lang_emergency',enable:true},
                        {label:'实时警力',icon:'alarm_add',name:'Lang_RealTimePoliceStrength',enable:true},
                        {label:'电子栅栏统计',icon:'directions_run',name:'HistoryUserInStockade',enable:true},
                        {label:'在线统计',icon:'trending_up',name:'trending_up',enable:true},
                        {label:'用户时长统计',icon:'av_timer',name:'UserTimeStatistics',enable:true},
            ],
            isshowmini:false,
            ocxRegStatus:false, 
            DTCZEnable:true,   //动态重组权限
            SMSEnable:true,    //短信权限
            PullUp_ControlEnable:true, //GPS上拉权限
            GPS_ControlEnable:true,    //GPS上报权限
            loadingvue:null,
            hideheatmap:false,
            downtoolBox:false,
                
        }
    },
    mixins:[languageset,],
    beforeCreate(){
         window.vue_index= this;
    },
    created(){
      
       
        this.loadingvue = this.$loading({text: 'loading',});
    },
    mounted(){
   

       var _this = this;  
        for (let i = 0; i < this.lmenuitems1.length; i++) { 
            _this.lmenuitems.push(_this.lmenuitems1[i]) 
        };                                    
        document.onkeydown = function(e) {            
            if(document.activeElement.nodeName!='INPUT'){
                switch(window.event.key)
                {
                    case "0":
                    case "1":
                    case "2":
                    case "3":
                    case "4": 
                    case "5": 
                    case "6": 
                    case "7": 
                    case "8": 
                    case "9": 
                
                    _this.$refs.dmenu.changeshowtab(window.event.key,'dialplate');
                    
                        break;
                    case "l":
                    _this.$refs.dmenu.changeshowtab('','eyemaps');
                        break;
                    case "r":
                    _this.$refs.dmenu.changeshowtab('','realtime');
                        break; 
                    case "b":
                    _this.$refs.dmenu.changeshowtab('','basestationchart');
                        break;  
                    case "s":
                    _this.$refs.leftToolbox.select_rangle();
                        break;         
                    default:
                        break;
                }         
            
            }
            };
    },
    computed:{
      
    },
    components:{
        banner,
        OCX,
        Lmenu,
        Dmenu,
        MapToolbox,
        Callbox,
        notice,
        LeftToolbox,
        Mainmap,
        toolBox,
    },
  
  methods:{

        buttonIn(){
            this.isSuccessButton2Hover=true
        },
        buttonOut(){
            this.isSuccessButton2Hover=false
        },
        downloadover:function(type,msg){
            
             switch(type){
                 case "error":
                      this.$refs.notice.error(type,msg);
                     break;
                 case "success":
                     this.$refs.notice.info(type,msg);
                     break;
                 default:
                     break;
             }
            

             },
        increase:function(val){
        },
        listenchangeDmenu:function(isshow){
           this.hidedmenu=!isshow;
           debugger;
           (isshow)?this.dmenuszie='260px !important':this.dmenuszie='10px !important'
          // console.info(isshow+this.dmenuszie)
          this.downtoolBox=!isshow;
        },
        cldaiplate:function(){  
              this.$refs.dmenu.changeshowtab('','dialplate');
        },
        handleClick:function(text){
            alert(text);
        },
        Bannerselectedchange:function(val){
         console.info(val);
           switch (val){
               case "exit":
                   loginout();//调用原系统退出
                   break;
               case "options":
                   openwindows("options");//调用原系统
                   break;
                case "servicemanager":
                    this.lmenuitems.splice(0);
                    for (let i = 0; i < this.lmenuitems2.length; i++) { 
                    this.lmenuitems.push(this.lmenuitems2[i]) 
                    };      
                 break;
            case "help":
                         break;
               default:
                   this.lmenuitems.splice(0);
                     for (let i = 0; i < this.lmenuitems1.length; i++) { 
                    this.lmenuitems.push(this.lmenuitems1[i]) 
                    };    
                            
                   break;             
           }   
        },
        fullscreen:function(){
            this.isshowmini=!this.isshowmini;
            if (this.isshowmini==true){
            this.$refs.dmenu.hide(false);
            this.$refs.lmenu.fullscreen();
            }
            else
            {
            this.$refs.dmenu.hide(true);
            this.$refs.lmenu.exitfullscreen(); 
            }
          
        },
        regmsg:function(msg,dispName){
            switch (msg) {
                case "REG_SUCCESS":
                    this.ocxRegStatus=true;
                    this.isSuccessCardContent.msg=useprameters.eTramsg;
                    this.isSuccessCardContent.ssi=useprameters.hostISSI;
                    this.isSuccessCardContent.dispName=useprameters.dispName;
                    this.isSuccessCardContent.usename = useprameters.usename;
                case "“LINK_SUCCESS":    
                    this.ocxRegStatus=true;
                    this.isSuccessCardContent.msg=useprameters.eTramsg;
                    this.isSuccessCardContent.ssi=useprameters.hostISSI;
                    this.isSuccessCardContent.dispName=useprameters.dispName;
                    this.isSuccessCardContent.usename = useprameters.usename;
                    break;
                case "REG_FAIL":
                      this.ocxRegStatus=false;
                    this.isSuccessCardContent.msg=useprameters.eTramsg;
                    this.isSuccessCardContent.ssi=useprameters.hostISSI;
                    this.isSuccessCardContent.dispName=useprameters.dispName;
                    this.isSuccessCardContent.usename = useprameters.usename;
                case "LINK_DISCONNECT":   
                      this.ocxRegStatus=false;
                      this.isSuccessCardContent.msg=useprameters.eTramsg;
                    this.isSuccessCardContent.ssi=useprameters.hostISSI;
                    this.isSuccessCardContent.dispName=useprameters.dispName;
                    this.isSuccessCardContent.usename = useprameters.usename;
                    break;
                default:
                    break;
            }
        },
        updateuseprameters(){
            this.isSuccessCardContent.usename = useprameters.usename
            if (useprameters.DTCZEnable=='0'){  //动态重组
            this.$set(this.lmenuitems1[5], 'enable', false);
            this.DTCZEnable=false;
            }

            if (useprameters.GPS_ControlEnable=='0'){  //GPS上报
            this.$set(this.lmenuitems1[1], 'enable', false);
            this.GPS_ControlEnable=false;
            }
            if (useprameters.PullUp_ControlEnable=='0'){  //GPS上拉
            this.$set(this.lmenuitems1[2], 'enable', false);
            this.PullUp_ControlEnable=false;
            }
            if (useprameters.SMSEnable=='0'){  //短信 
            this.$set(this.lmenuitems1[3], 'enable', false);
            this.SMSEnable=false;
            } 
         },
        setlanguage(){
            this.language.Control=GetTextByName("Control");
            this.language.ControlNumber=GetTextByName("ControlNumber");
            this.language.ControlNotRegistered=GetTextByName("ControlNotRegistered");
            this.language.ControlRegisteredUsers=GetTextByName("ControlRegisteredUsers");
            this.language.LogonUser=GetTextByName("LogonUser");


             this.lmenuitems.splice(0);
             this.lmenuitems1.splice(0);
             this.lmenuitems2.splice(0);

             let czck=GetTextByName("Lang_Callpanel");//操作窗口
             let gpssb = GetTextByName("Lang_GPS_Control");//GPS上报Lang_GPS_Control
             let gpssl = GetTextByName("Lang_GPS_Pull");
             let SMS = GetTextByName("SMS");
             let czrz = GetTextByName("operLog_Menu");
             let dtcz = GetTextByName("Lang_DTCZ");

             let gpssbtj = GetTextByName("Lang_gpstj");
             let djbbtj = GetTextByName("Lang_djbbtj");
             let rysbgl = GetTextByName("Lang_UserDeviceManage");
             let gpssjgl = GetTextByName("Lang_GPSDataManage");  
             let yagl = GetTextByName("Lang_emergency"); 
             let ssjl = GetTextByName("Lang_RealTimePoliceStrength"); 
             let dzzl = GetTextByName("Lang_DZLLStatistic"); 
             let zxtj = GetTextByName("Lang_OnlinesStatistic"); 
             let sctj = GetTextByName("UserTimeStatistics");
                // DTCZEnable:true,   //动态重组权限
                // SMSEnable:true,    //短信权限
                // PullUp_ControlEnable:true, //GPS上拉权限
                // GPS_ControlEnable:true,    //GPS上报权限  
             this.lmenuitems1.push(
                 {label:czck,icon:'gps_fixed',name:'hjmb',enable:true},
                 {label:gpssb,icon:'history',name:'gpslist',enable:this.GPS_ControlEnable},
                 {label:gpssl,icon:'navigation',name:'GPSPullList',enable:this.PullUp_ControlEnable},
                 {label:SMS,icon:'mail_outline',name:'sms_sjx',enable:this.SMSEnable},
                 {label:czrz,icon:'event_note',name:'operationlog',enable:true},
                 {label:dtcz,icon:'group_add',name:'dtczrestlt',enable:this.DTCZEnable});

             this.lmenuitems.push(
                 {label:czck,icon:'gps_fixed',name:'hjmb',enable:true},
                 {label:gpssb,icon:'history',name:'gpslist',enable:this.GPS_ControlEnable},
                 {label:gpssl,icon:'navigation',name:'GPSPullList',enable:this.PullUp_ControlEnable},
                 {label:SMS,icon:'mail_outline',name:'sms_sjx',enable:this.SMSEnable},
                 {label:czrz,icon:'event_note',name:'operationlog',enable:true},
                 {label:dtcz,icon:'group_add',name:'dtczrestlt',enable:this.DTCZEnable});

             this.lmenuitems2.push(
                {label:gpssbtj,icon:'insert_chart',name:'Lang_gpstj',enable:true},
                {label:djbbtj,icon:'equalizer',name:'Lang_djbbtj',enable:true},
                {label:rysbgl,icon:'supervisor_account',name:'Lang_UserDeviceManage',enable:true},
             //   {label:gpssjgl,icon:'assignment',name:'Lang_GPSDataManage',enable:true},
                {label:yagl,icon:'build',name:'Lang_emergency',enable:true},
                {label:ssjl,icon:'alarm_add',name:'Lang_RealTimePoliceStrength',enable:true},
                {label:dzzl,icon:'directions_run',name:'HistoryUserInStockade',enable:true},
                {label:zxtj,icon:'trending_up',name:'trending_up',enable:true},
                {label:sctj,icon:'av_timer',name:'UserTimeStatistics',enable:true},
                );
               
        },
        init:function(){
            this.loadingvue.close();
            this.$refs.banner.updateuseprameters();
            this.$refs.dmenu.updateuseprameters();
            this.$refs.leftToolbox.updateuseprameters();
            
            this.updateuseprameters();
           
            if (this.get_language()!='zh-CN'){
                this.setlanguage();
                this.$refs.banner.setlanguage();
                this.$refs.dmenu.setlanguage();
                this.$refs.maptoolbox.setlanguage();
                this.$refs.leftToolbox.setlanguage();
                this.$refs.lmenu.setlanguage();
            }
            console.info('耗时: '+(new Date()-profstart).toString());
        }
        ,  
        updatelola(){
             if (!this.$refs.dmenu.showdmenu||this.$refs.dmenu.tabname!='eyemaps')return;
             let issis ='';
             for (let i=0;i<useprameters.lockids.length;i++){
                 if (i>0){
                     issis+=','+useprameters.lockids[i].issi;
                 }else{
                      issis+=useprameters.lockids[i].issi;
                 }
             };
           
            // console.info(issis)
             if (issis=='')return;
              Vue.axios.get('/WebGis/Service/getlolabyISSIs.ashx', { // ，/app/data/json/OnlineTerminalCountGroupByBS.json，/Handlers/MVCEasy.ashx，
                            params: {
                                issis:issis,
                                temptime:new Date().getTime(),                              
                            }
                          }).then((res) => {

                                  for (let n=0;n<useprameters.lockids.length;n++){
                                       for (let i=0;i<res.data.length;i++){
                                            if(useprameters.lockids[n].issi==res.data[i].issi){
                                                useprameters.lockids[n].lat=res.data[i].la;
                                                useprameters.lockids[n].lon=res.data[i].lo;
                                                res.data.splice(i,1);
                                                break;
                                            }
                                        }
                                  }
                       
                         
                          }).catch((err) => {
                          console.log(err)
                           
                   })
                    
        },
        
        } 
       
    }

</script>
<style scoped>
.isSuccess{
    position: absolute;
    height:auto!important;
    right: 15px; 
    top :25px;
    width: 200px!important;
    z-index: 888!important;
}
.isSuccessButton2{
    font-size:20px!important;
    width: 32px;
    margin:0;
    padding:6px;
    border:none;
}
.isSuccessCard{
    width: 100%;
    text-align: center;
}
  
  #main {
    width: auto;
    height: 100%;
  }
  .top{
      position: relative;;
      top: 0;
      height: 58px !important;
      width: 100%;
      float: left;
      z-index: 2;
  }
  .topMini{
    width: auto;
  }
  .left{
      position:absolute;
      left: 0;
     
      top:58px;
      bottom: 250px;
   
  }
  .hidedmenu{
      bottom: 0 !important;
  }
.bottom{
      position:absolute;
      width: 100%;
      bottom: 0;
  }
  .toolboxdiv{
      position: absolute;
      right: 10px;
      top: 70px;
      
  }
  .callbox{
      position: absolute;
      bottom: 250px;
 
  }
  .toolbox{
      z-index: 999;
      position: absolute;
      bottom: 217px ;
      right:120px ;
       cursor: pointer;
       /*position: absolute;
      top: 110px !important;
       right: 20px !important;
       */
  }
  .downtoolBox{
      bottom: -3px !important;

  }
  #bottom-right-wrapper,.callbox,.left{
         transition:all 0.6s;
    -moz-transition:all 0.6s; /* Firefox 4 */
    -webkit-transition:all 0.6s; /* Safari and Chrome */
     -o-transition:all 0.6s; /* Opera */
  }


</style>
<style>
 .v-contextmenu--default,.v-contextmenu{
      background-color: #13204d!important;
     
  }
  .v-contextmenu-item,.v-contextmenu-divider{
    color:#fff!important;
  }
</style>