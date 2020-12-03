<template>
    <div style="position:relative;">   
        <div  class="css_animation ">
            <div class="laydiv"></div>
            <div class="fontdiv cssrota">
                <i class="fas fa-location-arrow"></i>
            </div>
            <div class="circle"></div>
        </div>
        <div class="title">
            {{lockdevice.name}}({{lockdevice.issi}})
            <div class="toolbox">
                <span @click="changelinkmap" :class="[linkmap?'linkmap':'']" >
                    <i class="fas fa-tv" ></i>
                </span>
                <span @click="closemap">
                    <i class="fas fa-times-circle"></i>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import store from "@/vuex/store"
import {UPDATE} from '@/vuex/modul_types'
import math from "@/mixin/math"
import { debug } from 'util';


let noticemod;
export default {
    mounted(){
        //this.creatCoordinateBiasedAlgorithm();
        this.initMap();
        
    },
    mixins:[math,],
    data(){
        return {
        map:null,
        option:null,
        mapview:null,
        layer:null,
        lo:'',//中心点
        la:'',//中心点
        maxLevel:'',//最大几层
        minLevel:'',//最小几层
        currentLevel:'', //显示第几层
        gistype:'',
        point_div:null,
        point_overlay:null, 
        CoordinateBiasedAlgorithm:null,//偏移算法
        }
    },
    destroyed(){ 
            clearInterval(noticemod); 
            if(this.linkmap)store.dispatch(UPDATE,''); //如果该设备投屏，解锁后清空投屏ID
        },
    
    computed: {
        linkmap:function(){
            return this.lockdevice.userid==store.getters.get_id;
        },
        coordinates:function(){
            return ol.proj.transform([parseFloat(this.lockdevice.lon), parseFloat(this.lockdevice.lat)], 'EPSG:4326', 'EPSG:3857');
        }
    },
    watch:{
        coordinates:function(newval,oldval){
            this.map.getView().animate({center:this.coordinates}); //,{rotation:rotationvalue}
            this.point_overlay.setPosition(this.coordinates);
            let offsetX =  oldval[0] - newval[0];
            let offsetY =  oldval[1] - newval[1];
            offsetX = offsetX == 0 ? Math.pow(0.1, 10) : offsetX;
            var degree = ((Math.PI - Math.atan(offsetY / offsetX) - offsetX / Math.abs(offsetX) * Math.PI / 2) / Math.PI * 180);
                if (degree >= 180) {
                    degree = (degree - 180).toFixed(0)
                } else if (degree < 180) {
                    degree = (degree + 180).toFixed(0)
                }
            this.point_div.style.transform = 'rotate('+degree+'deg)';
            this.map.render();
        }, 
    },
    props:['lockdevice'],//eyemaps传入的数组 锁定的设备
    methods:{
        changelinkmap(){
            if (this.linkmap==true){
                store.dispatch(UPDATE,'');
                onMove();//地图移动
            }else{
                store.dispatch(UPDATE,this.lockdevice.userid); 
            }
            projectScreen(store.getters.get_id,this.lockdevice.lon,this.lockdevice.lat);  //通知主地图移动     
        },
        closemap(){
            useprameters.lockids.forEach((item,index)=>{   
                if(item.userid==this.lockdevice.userid){
                    lockuser(this.lockdevice.userid, 0);
                    // useprameters.lockids.splice(index,1)
                }
            });
            if (this.linkmap){
                projectScreen('','','');//通知主地图取消关联
            }
        },
        initMap() {
            var GISTYPE = useprameters.GISTYPE.toLowerCase();
            var viewParam = {
                "lo": useprameters.PGIS_Center_lo,//中心点
                "la": useprameters.PGIS_Center_la,//中心点
                "maxLevel": useprameters.maxLevel,//最大层级
                "minLevel": useprameters.minLevel,//最小层级
                "currentLevel": useprameters.maxLevel-2//显示层级
            }
            var view = createView(GISTYPE, viewParam);//创建视图
            this.map = new ol.Map({
                target:  this.$el,
                // 设置地图控件，默认的三个控件都不显示
                controls: ol.control.defaults({
                    attribution: false,
                    rotate: false,
                    zoom: false
                }),
                view: view
            }); 
            var offlineMapLayerParams = createBaseMapParameter(GISTYPE);
            var streetMapLayer = createStreetMapLayer(this.map, "offlineMapLayer", offlineMapLayerParams);//创建街景图
            this.point_div = this.$el.getElementsByClassName("css_animation")[0];
                this.point_overlay = new ol.Overlay({
                element: this.point_div,
                positioning: 'center-center'
            });
            this.map.getView().animate({center:this.coordinates}); //,{rotation:rotationvalue}
            this.point_overlay.setPosition(this.coordinates);
            this.map.addOverlay(this.point_overlay);
        },
    }
}
</script>
<style scoped>
div{
    height: 100%;
}
.css_animation{
  height:20px;
  width:20px;  
}
.circle{
    margin: 10px auto;
    width: 20px;
    height: 20px;
    border: 2px transparent solid;
    border-left-color: #ff5500;
    border-right-color:#0c80fe;
    border-radius: 100%;
    animation: loading1 1s infinite linear;
}
@keyframes loading1{
    from{transform: rotate(0deg)}to{transform: rotate(360deg)}
}
.css_animation .laydiv{
    height:20px;
    width:20px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 1);
    transform: scale(0);
    animation: myfirst 1s;
    animation-iteration-count: infinite;
     position: absolute; 
     
}
@keyframes myfirst{
    to{
        transform: scale(2);
        background: rgba(0, 0, 0, 0.2);
    }
}
.css_animation .fontdiv{
    position: absolute; 
    height:20px;
    width:20px;
    border-radius: 10px;
    border: 1px solid #fff;
    background-color: #164b77;
    color: #fff;
}
.cssrota{
transform:rotate(315deg);
-ms-transform:rotate(315deg); 	/* IE 9 */
-moz-transform:rotate(315deg); 	/* Firefox */
-webkit-transform:rotate(315deg); /* Safari 和 Chrome */
-o-transform:rotate(315deg); 	/* Opera */
}
.title{
    position: absolute;
    background-color: rgba(30,144,255,0.8);
    height: 24px;
    float: left;
    width: 100%;
    z-index: 1;
 
    line-height: 24px;
    text-align: left;
    padding-left: 5px;
    color: #fff;
}
.toolbox{
    float:right;
}
.toolbox i,.toolbox svg{
    font-size: 18px;
    margin-right: 5px;
    margin-top: 3px;
    cursor: pointer;
}
.toolbox i:hover,.toolbox svg:hover{
   color:chartreuse;
}
.linkmap svg:nth-child(1){
  color:chartreuse;
}
</style>
