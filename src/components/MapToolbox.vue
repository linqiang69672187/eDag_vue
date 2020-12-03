<template>
<div class="toolboxdiv">
    <div class="toolbox " :class="{toolboxzindex:toolzindex}" >
        <ul>
            <li><a id="ol-ranging" @click="showdistance" ><Tooltip :content="language.measure" placement="bottom"> <div><i class="fas fa-ruler"></i></div></Tooltip></a></li>
            <li><a>
                <Poptip trigger="click" width="180"  placement="bottom">
                     <Tooltip :content="language.layercontrol" placement="bottom"><div><i class="fas fa-map"></i></div></Tooltip>
                     <div class="api" slot="content">
                         <div>
                             {{language.layercontrol}}
                         </div>
                        <ul>
                            <li> 
                                 <div>
                                    <div class="left">{{language.basestation}}：</div> 
                                    <div class="right">
                                    <i-switch  @on-change="BSchange" v-model="basestationStatus"   size="large">
                                        <span slot="open">{{language.open}}</span>
                                        <span slot="close">{{language.close}}</span>
                                    </i-switch>
                                    </div>
                                 </div>
                            </li>
                            <li>
                                 <div>
                                    <div class="left">{{language.entity}}：</div> 
                                    <div class="right">
                                    <i-switch @on-change="Entitychange"  v-model="entityStatus"  size="large">
                                        <span slot="open">{{language.open}}</span>
                                        <span slot="close">{{language.close}}</span>
                                    </i-switch>
                                 </div>
                                 </div>
                            </li>
                            <li>
                                <div>
                                 <div class="left">{{language.user}}：</div> 
                                    <div class="right">
                                    <i-switch  @on-change="Userchange"  v-model="userStatus"  size="large">
                                        <span slot="open">{{language.open}}</span>
                                        <span slot="close">{{language.close}}</span>
                                    </i-switch>
                                    </div>
                                </div>
                            </li>
                            <li v-if="isBeaconStatus">
                                <div>
                                 <div class="left">{{language.Lang_Beacon}}：</div> 
                                    <div class="right">
                                    <i-switch  @on-change="Beaconchange"  v-model="BeaconStatus"  size="large">
                                        <span slot="open">{{language.open}}</span>
                                        <span slot="close">{{language.close}}</span>
                                    </i-switch>
                                    </div>
                                </div>
                            </li>
                        </ul>
                     </div>
                </Poptip >
            </a></li>
            <li><a @click="fullscreen"><Tooltip :content="language.fullscreen" :class="[isshowmini?'hide':'']" placement="bottom"> <div><i class="fas fa-window-maximize"></i></div></Tooltip><Tooltip :content="language.reback" placement="bottom" :class="[isshowmini?'':'hide']"> <div><i class="fas fa-window-minimize"></i></div></Tooltip></a></li>
            <li><a @click="zoomOut"><Tooltip :content="language.zoomOut" placement="bottom"> <div><i class="fas fa-search-minus"></i></div></Tooltip></a></li>
            <li><a @click="zoomIn"><Tooltip :content="language.zoomIn" placement="bottom"> <div><i class="fas fa-search-plus"></i></div></Tooltip></a></li>           
        </ul>
    </div>
    <transition name='slide-fade' v-on:before-enter="beforeEnter"  >
     
        <div  v-show="show" class="computedistance">
            <ul>
                
                <li>
                    <a id="BoxSelection-type1">
                         
                            <Tooltip :content="language.distance" placement="bottom"> 
                            <div><i class="fas fa-map-pin"></i></div>
                            </Tooltip>
                         
                    </a>
                    </li>
                

                <li><a id="BoxSelection-type2">
                   
                        <Tooltip :content="language.area" placement="bottom"> 
                        <div><i class="fas fa-object-ungroup"></i></div>
                        </Tooltip>
                  
                    </a></li>
            </ul>
            <div id="mouse-position" class="measurevalue"></div>
        </div>
 
     </transition>
</div>
</template>
<script>
import Vue from 'vue'
import { Switch } from 'iview'
Vue.component('i-switch', Switch)
import {Tooltip,Poptip,Checkbox } from 'iview'
export default {
     data(){
       return{ 
           show: false ,
           toolzindex:false,
           isshowmini:false,
           basestationStatus:true,
           entityStatus:true,
           userStatus:true,
           BeaconStatus:true,
           isBeaconStatus:false,
           language:{
               measure:'测量',
               layercontrol:'图层控制',
               basestation:'基 站',
               open:'开启',
               close:'关闭',
               entity:'单 位',
               user:'用 户',
               fullscreen:'全屏',
               reback:'恢复',
               zoomOut:'缩小',
               zoomIn:'放大',
               distance:'距离',
               area:'面积',
               Lang_Beacon:'信 标',
           }           
       }
    },
    
    mounted(){
            
             let _this = this;
              Vue.axios.get('/Handlers/MVCEasy.ashx', { 
                            params: {
                                times:new Date().getTime(),
                                ctrl: "BeaconDao",
                                action: "GetBeaconNavigationDisplay"
                            }
                          }).then((res) => {
                             _this.isBeaconStatus=res.data;

                          }).catch((err) => {
                          console.log(err)
                           
                   })
    },
    methods:{
        showdistance:function(){
              this.show = !this.show
              if (!this.show){ 
                this.toolzindex=true; 
              }
             
          },
         beforeEnter: function (el) {
              this.toolzindex=true;
         },
         fullscreen:function(){
             this.isshowmini=!this.isshowmini;
             this.$emit("fullscreen");  
         },
         BSchange:function(){
             layershowControl('bsLayer',this.basestationStatus);
         },
         Entitychange:function(){
             layershowControl('entityLayer',this.entityStatus);
        },
         Userchange:function(){
             layershowControl('userLayer',this.userStatus);
        },
         Beaconchange:function(){
             beaconLayerManager.setVisible(this.BeaconStatus);
        },
        zoomOut:function(){
            let loadevent = LoadEvents("zoomOut");
            loadevent();//调用原来缩小
        },
        zoomIn:function(){
            let loadevent = LoadEvents("zoomIn");
            loadevent();//调用原来放大
        },
        setlanguage(){
            this.language={
               measure:GetTextByName("Distancemeasurement"),
               layercontrol:GetTextByName("Parametersetting"),
               basestation:GetTextByName("OperateLogIdentityDeviceType0"),
               open:GetTextByName("Single_Open"),
               close:GetTextByName("Closebtn"),
               entity:GetTextByName("Unit"),
               user:GetTextByName("use"),
               fullscreen:GetTextByName("fullScreen"),
               reback:GetTextByName("Lang_Recover"),
               zoomOut:GetTextByName("ZoomOut"),
               zoomIn:GetTextByName("ZoomIn"),
               distance:GetTextByName("MeasureBar_distancetooltip"),
               area:GetTextByName("MeasureBar_surfacetooltip"),
               Lang_Beacon:GetTextByName("Lang_Beacon"),
           }  

         } 
    },  
    components:{
           Tooltip,
           Poptip,
           Switch,
           Checkbox
         },
  
}
</script>
<style scoped>
    .hide{
        display: none;
    }
    .toolboxdiv{
        height: 36px;
        width: 210px;
    }
    .computedistance{
        height: 36px;
        width: 80px;
        background-color: #164b77;
        border-top-left-radius:18px 18px;
        border-bottom-left-radius:18px 18px;
        font-size: 18px;
        line-height: 36px;
        position:absolute;
        top:0px;
        left: -60px;
        z-index: 2;
    }
    .toolbox{
        height: 36px;
        width: 210px;
        background-color: #164b77;
        border-radius: 18px;
        font-size: 18px;
        line-height: 36px;
        position:absolute;
        z-index: 3;
    }
    .toolboxzindex{
        z-index: 1;
    }
    ul,ul>li{
        display: inline-block;
    }

    .toolbox>ul>li{
        width: 32px;
        height: 32px;
    }
    .toolbox>ul>li>div{
        width: 32px;
        height: 32px;
        line-height: 32px;
    }

  
  
   ul>li a{
      color: #fff;
    }
    .focus{
      background-color: #fff;
      color: #164b77;
      border-radius: 16px;
      height: 32px;
    }
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
    transition: all .5s ease;
    }
    .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(70px);
    opacity: 0;
    }
    .api {
     color:#515a6e;
    font-size: 14px;
    }
    .api li{
        display: block;
        height: 26px;
        line-height: 26px;
    }
    .api>div{
      text-align: left;
      border-bottom:1px solid #999999
    }
    .left{
        float: left;
        width: calc(100% - 50px);
        text-align: right;
    }
    .right{
        float: right;
          width: 50px;
    }
    .computedistance li:nth-child(2){
        margin-right: -10px;
        margin-left: 5px;
    }
    .measurevalue{
       height: 22px;
       background-color:  rgba(255,255,255,0.8);
       border-radius: 3px;
       font-size: 14px;
       color: #515a6e;
       line-height: 22px;
       margin-top: 5px;
    }
  a:hover{
    color:burlywood;
  }
  a:active{
     opacity: 0.3;  
  }
</style>
<style >
.ivu-poptip-body {
    padding: 8px 8px;
}
</style>