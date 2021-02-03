<template>
    <div  style="height:100%">
       <div id="control" :style="{  width: controlwidth + 'px' }">
           <ul>
               <li>  
                   <Select v-model="ssri" :disabled="spinShow"  style="width:100px" >
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                   </Select>
               </li>
               <li> </li>
               <li>
                  <DatePicker  @on-change="selectChange"  :disabled="spinShow" :editable="false"  format="yyyy-MM-dd" type="daterange"  placement="bottom-end" :placeholder="language.selectTime" style="width: 200px"></DatePicker>
               </li>
                <li>
                    <div>
                                 <div class="left">{{language.basestation}}：</div> 
                                    <div class="right">
                                    <i-switch  @on-change="Beaconchange" :disabled="spinShow"  v-model="BeaconStatus"  size="large">
                                        <span slot="open">{{language.open}}</span>
                                        <span slot="close">{{language.close}}</span>
                                    </i-switch>
                                    </div>
                   </div>
                </li> 
            
                <li>
                 <Button  icon="ios-map"  :disabled="spinShow"  @click="selectHeatmap">{{language.selectSrri}}</Button>
                </li>
            
           </ul>
          
       </div>
       <div id="legend">

       </div>
<!--        
      <div id="valuetable">
          <Table border :columns="columns5" :data="rssiData"></Table>
          <Page :total="100" />
       </div>
       -->
            <notice ref="notice"></notice>
             
          <Spin fix  v-if="spinShow">
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
          </Spin>
        
            
    </div>
</template>
<script>
import Vue from 'vue';

import { Select,DatePicker,Page,Spin,Icon,Button, Switch } from 'iview'
Vue.component('i-switch', Switch)
import notice from "@/components/control/notices";


// configure language


export default {
    data(){
        return{
                lockitems:[],//锁定的设备
                backgroundDiv: {
                    backgroundImage: 'url(' + require('@/assets/images/tabs_table_bg2.png') + ')'
                },
                map:null,
                htmap:null,
                bsmap:null,
                 cityList: [
                    {
                        value: 'MsRssi',
                        label: '手台场强'
                    },
                    {
                        value: 'UlRssi',
                        label: '上行场强'
                    }
                ],
                ssri: 'MsRssi',
                legendLabel:'图例',
                sdate:[],
                BeaconStatus:false,
                controlwidth:610,
                /**
                columns5: [
                    {
                        title: 'ISSI',
                        key: 'issi',
                        sortable: true
                    },
                    {
                        title: '位置',
                        key: 'co'
                    },
                    {
                        title: '手台场强',
                        key: 'MS',
                        sortable: true
                    },
                    {
                        title: language.UIvalue,
                        key: 'UI'
                    }
                ],
                rssiData:[],
                 */
                spinShow: false, 
                work:null,
                isloadBs:false,
                language:{
                    selectTime:'选择时间',   //_this.$refs.notice.info("场强信息","终端号码："+issi+"<br/>手台场强："+MS+"<br/>上行场强："+UI);
                    srriInfo:'场强信息',
                    issi:'终端号码',
                    MSvalue:'手台场强',
                    UIvalue:'下行场强',
                    basestation:'基 站',
                    open:'开启',
                    close:'关闭',
                    selectSrri:'查看当前范围场强'
                }
           
        }
    },
    created(){
         
    },
    beforeCreate(){
         window.vue_index= this;
    },
    components:{
         notice,
    },
    mounted(){
      this.setlanguage();
      this.initMap();
      //this.loadHeatmapData();
    },
    methods:{  
         loadBsStation(){
                let _this =this;
               Vue.axios.get('/Handlers/GetAllBaseStation_geojson.ashx', { // ，/app/data/json/OnlineTerminalCountGroupByBS.json，/Handlers/MVCEasy.ashx，
                            params: {
                                L:'1',                                         
                            }
                          }).then((res) => {
                          console.info(res)
                          _this.createBsFeature(res.data);
                       
                          }).catch((err) => {
                          console.log(err)
                          _this.isloadBs=true;
                      
                   });   
            },
            loadHeatmapData(date1){
                console.info(date1);
                if (this.spinShow)return;
                var extent = this.map.getView().calculateExtent(this.map.getSize());

                var bottomLeft = ol.proj.transform(ol.extent.getBottomLeft(extent),'EPSG:3857', 'EPSG:4326');
                var topRight = ol.proj.transform(ol.extent.getTopRight(extent),'EPSG:3857', 'EPSG:4326');
                var bbs = bottomLeft[0] + "_" + topRight[0] + "_" + bottomLeft[1] + "_" + topRight[1] ;
                 console.info(bbs);
                this.sdate =date1; 
                let sdate=date1[0]+'_'+date1[1];
                if (date1[0]=="") return;
                this.spinShow=true;
                let _this =this;
                Vue.axios.get('/Handlers/getHeatmapRssidata.ashx', { // ，/app/data/json/OnlineTerminalCountGroupByBS.json，/Handlers/MVCEasy.ashx，'/Handlers/getHeatmapRssidata.ashx'
                            params: {
                                type:this.ssri,
                                sdate:sdate, 
                                  bbs:bbs                       
                            }
                          }).then((res) => {
                            _this.createFeature(res.data);
                           
                           _this.rssiData =  res.data;
                            _this.spinShow=false;
                          }).catch((err) => {
                          console.log(err)
                           _this.spinShow=false;
                      
                   });
                
                   
            },
            createLegend(){
                let params = {
                            krigingModel: 'exponential',//model还可选'gaussian','spherical'
                            krigingSigma2: 0,
                            krigingAlpha: 100,
                            canvasAlpha: 0.5,//canvas图层透明度
                            colors: ['#E3FFC6', '#0f0', '#00f', '#ff0', '#f00']
                        }
                let drawLabel = function (x, y, color, type, text, textSize) {
                            var side = 3;
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            ctx.lineTo(x + side, y - side);
                            ctx.lineTo(x + side, y + side);
                            ctx[type + 'Style'] = color;
                            ctx.closePath();
                            ctx[type]();
                            ctx.font = textSize + "px Arial";
                            ctx.fillStyle = "#000";
                            ctx.fillText(text, x + side + 2, y + textSize / 2 - 2);
                        }
                
                            
                        var textOffsetHeight = 25,textHeight = 16;//文字与上部偏离，文字大小
                        var offsetY = 15, offsetX = 10;//渐变矩阵偏离度
                        var rectHeight = 70, rectWidth = 30;//渐变矩阵高和宽

                        var canvas = document.createElement('canvas');
                        canvas.style.marginBottom = "-5px";
                        var ctx = canvas.getContext("2d");
                        canvas.height = 140;
                        canvas.width = 100;
                        ctx.fillStyle = "#fff";
                        ctx.fillRect(0, 0, canvas.width, canvas.height); //绘制底图
                        ctx.font = "bold "+ textHeight + "px Arial";
                        ctx.fillStyle = "#000";
                        ctx.fillText(this.legendLabel, canvas.width / 2.6, textOffsetHeight);

                        //绘制渐变矩形
                        var lg = ctx.createLinearGradient(offsetX, textOffsetHeight + offsetY, offsetX, textHeight + textOffsetHeight + offsetY + rectHeight);
                        var colorArray = params.colors;
                        colorArray.forEach(function (v,n) {
                            lg.addColorStop(n / colorArray.length, v);
                        });
                        ctx.fillStyle = lg;
                        ctx.beginPath();
                        ctx.fillRect(offsetX, textOffsetHeight + offsetY, rectWidth, rectHeight);
                        ctx.fillStyle = "black";
                        ctx.beginPath();
                        ctx.fillRect(offsetX, textOffsetHeight + offsetY + rectHeight, rectWidth, rectHeight / 4);

                        //绘制标签
                        drawLabel(offsetX + rectWidth + 2, textOffsetHeight + offsetY, "#000", "fill", 20 + " dB", "12");
                        drawLabel(offsetX + rectWidth + 2, textOffsetHeight + offsetY + rectHeight / 4, "#000", "fill", "-80 dB", "12");
                        drawLabel(offsetX + rectWidth + 2, textOffsetHeight + offsetY + rectHeight / 2, "#000", "fill", "-90 dB", "12");
                        drawLabel(offsetX + rectWidth + 2, textOffsetHeight + offsetY + rectHeight * 3 / 4, "#000", "fill", "-100 dB", "12");
                        drawLabel(offsetX + rectWidth + 2, textOffsetHeight + offsetY + rectHeight, "#000", "fill", "-110 dB", "12");
                        drawLabel(offsetX + rectWidth + 2, textOffsetHeight + offsetY + rectHeight * 5 / 4, "#000", "fill", "-120 dB", "12");
                     let content = document.getElementById("legend");
                     content.appendChild(canvas);

            },
            sleepThread(numberMillis){
                var now = new Date(); 
                    var exitTime = now.getTime() + numberMillis; 
                    while (true) { 
                    now = new Date(); 
                    if (now.getTime() > exitTime) 
                    return; 
                    } 
            },
            createFeature (data) {
                     let source = this.htmap.getSource();
                           source.clear();
                            let myfeatures = (new ol.format.GeoJSON()).readFeatures(data, {     // 用readFeatures方法可以自定义坐标系
                                        dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
                                        featureProjection: 'EPSG:3857' // 设定当前地图使用的feature的坐标系
                                    })
                           source.addFeatures(myfeatures);
                       this.spinShow=false;                         
                },
            createBsFeature(data){
                 let source = this.bsmap.getSource();
                            let myfeatures = (new ol.format.GeoJSON()).readFeatures(data, {     // 用readFeatures方法可以自定义坐标系
                                        dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
                                        featureProjection: 'EPSG:3857' // 设定当前地图使用的feature的坐标系
                                    })
                           source.addFeatures(myfeatures);
            }, 
            fillColor(Rssi){
                let r=255,g=255,b=255;
                if(0<=Rssi && Rssi<=80){
                     r = parseInt(255-Rssi/80*255);
                     g = 255;
                     b = parseInt(255-Rssi/80*255);
               
                };
                if(80<Rssi&&Rssi<=90){
                     r = 0;
                     g =  parseInt(255-(Rssi-80)/10*255);
                     b = parseInt((Rssi-80)/10*255);
                       
                };
               if(90<Rssi&&Rssi<100){
                     r =  parseInt((Rssi-90)/10*255);
                     g =  parseInt((Rssi-90)/10*255);
                     b =  parseInt(255-(Rssi-90)/100*255);
                       
                };
               if(100<=Rssi&&Rssi<=110){
                     r =  255;
                     g =  parseInt(255-(Rssi-100)/10*255);
                     b = 0;
                       
                };
                if(110<Rssi&&Rssi<=150){
                     r =  parseInt(255-(Rssi-110)/40*255);
                     g =  0;
                     b =  0;
                       
                };

                return 'rgb('+r+','+g+','+b+')';
              

            },
            selectChange(val1,val2){
                debugger;
                this.sdate.length=0;
                this.sdate=val1;
                console.info(this.sdate);
               //this.createFeature(this.rssiData);
              
               // this.loadHeatmapData(this.sdate);
              // this.$Spin.show();
            //    this.spinShow=true;
            //    let features = this.htmap.getSource().getFeatures();
          
            //     features.forEach(element=>{
            //                    let Rssi = this.ssri=="MS"?parseInt(element.get('MS')):parseInt(element.get('UI')); 
            //                    let color= this.fillColor(Rssi)
            //                    element.setStyle(
            //                         new ol.style.Style({
            //                             image: new ol.style.Circle({
            //                                 radius: 5,
            //                                 fill: new ol.style.Fill({
            //                                     color: color
            //                                 }),
            //                             })
            //                         })
            //                     );
                             
            //              })  
     
            //   //  this.$Spin.hide();
            //  this.spinShow=false;

            },
            selectHeatmap(){
                this.loadHeatmapData(this.sdate);
            },
            changemap(){
               this.$router.push({name:'index'}) 
            },
         
            initMap() {
          
                this.createLegend();
                var GISTYPE =opener.useprameters.GISTYPE.toLowerCase();
                var viewParam = {
                    "lo":opener.useprameters.PGIS_Center_lo,//中心点
                    "la": opener.useprameters.PGIS_Center_la,//中心点
                    "maxLevel": opener.useprameters.maxLevel,//最大层级
                    "minLevel": opener.useprameters.minLevel,//最小层级
                    "currentLevel": opener.useprameters.maxLevel-2//显示层级
                }
                console.info(viewParam);
                var view = createView(GISTYPE, viewParam);//创建视图
                this.map = new ol.Map({
                    target:  this.$el,
                    // 设置地图控件，默认的三个控件都不显示
                    controls: ol.control.defaults({
                        attribution: false,
                        rotate: false,
                        zoom: false
                    }),
                    view: view,
                   
                }); 
            
                var offlineMapLayerParams = createBaseMapParameter(GISTYPE);
                var streetMapLayer = createStreetMapLayer(this.map, "offlineMapLayer", offlineMapLayerParams);//创建街景图
                var source = new ol.source.Vector({
                  //  url:'/Handlers/heatmap.json',
                   //  format: new ol.format.GeoJSON(),
                }) ;
                this.htmap = new ol.layer.Vector({
                            source: source,
                      });   
                var bssource = new ol.source.Vector({
                    
                }) ;    
                this.bsmap = new ol.layer.Vector({
                            source: bssource,
                            style:new ol.style.Style({
                                image:new ol.style.Icon({
                                    src:'../Images/BaseStation.png',
                                    offsetX: -30,
                                    offsetY: -36,
                                })
                            })
                        });  
                this.map.addLayer(this.htmap);
                this.map.addLayer(this.bsmap);
                let _this=this;
                
                source.on('addfeature', function (event) {
                    var feature = event.feature;
                    let color=_this.fillColor(feature.get('value'))
                               feature.setStyle(
                                    new ol.style.Style({
                                        image: new ol.style.Circle({
                                            radius: 10,
                                            fill: new ol.style.Fill({
                                                color: color
                                            }),
                                        })
                                    })
                                );
                    });
            

                /**
                let saoguan = new ol.Feature({
                    geometry:new ol.geom.Point(ol.proj.transform([123.4659219, 41.761773],'EPSG:4326','EPSG:3857'))
                });
                
                saoguan.setStyle(new ol.style.Style({
                    image:new ol.style.Icon({
                        src:'//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png'
                    })
                    }));
                
                 source.addFeature(saoguan);
                 */
                const dblClickInteraction = this.map
                            .getInteractions()
                            .getArray()
                            .find(interaction => {
                            return interaction instanceof ol.interaction.DoubleClickZoom;
                            });
                this.map.removeInteraction(dblClickInteraction);
  
                this.map.on('dblclick', function (evt) {
                  //  point_overlay.setPosition([0, 0]);
                   // $(".zq1").hide();
                  //  $(".table .localtd").removeClass("localtd"); //移出定位
                     var feature = _this.map.forEachFeatureAtPixel(evt.pixel,
                        function (feature) {
                            return feature;
                        });
                    if (feature) {
                     //   var coordinates = feature.getGeometry().getCoordinates();
                      //  var pixel = map.getPixelFromCoordinate(coordinates);


                        let value = feature.get('value');
                   
    
                        _this.$refs.notice.info(_this.language.srriInfo,_this.language.MSvalue+"："+value+"<br/>");
                        //srriInfo:'场强信息',
                       //issi:'终端号码',
                       //MSvalue:'手台场强',
                       //UIvalue:'下行场强',
                    }
                });
            
              //  this.map.getView().on('change:resolution', this.changemapcenter);
               // this.map.getView().on('change:center',this.changemapcenter);
            },
            changemapcenter(){
                this.loadHeatmapData(this.sdate);
            },
            Beaconchange(){
                this.bsmap.setVisible(this.BeaconStatus);
              
                if(this.BeaconStatus&&!this.isloadBs){
                    this.loadBsStation();

                }
            },
          setlanguage(){
              if (opener.useprameters.defaultLanguage=='zh-CN'){
                  return;
              }
            this.controlwidth=635;
            this.language={
               basestation:opener.GetTextByName("OperateLogIdentityDeviceType0"),
               open:opener.GetTextByName("Single_Open"),
               close:opener.GetTextByName("Closebtn"),
               selectTime:opener.GetTextByName("SelectDate"),
               srriInfo:opener.GetTextByName("FSHeatMap"),
               issi:opener.GetTextByName("Terminal"),
               MSvalue:opener.GetTextByName("signaldown"),
               UIvalue:opener.GetTextByName("signalup"),
               selectSrri:opener.GetTextByName("FSFWHeatMap"),
           }
           this.legendLabel=opener.GetTextByName("legend"); 
             this.cityList= [
                    {
                        value: 'MsRssi',
                        label: opener.GetTextByName("signaldown")
                    },
                    {
                        value: 'UlRssi',
                        label: opener.GetTextByName("signalup")
                    }
                ]
         },
         init(){
             
         } 

        },

    }
</script>
<style scoped>

#control{
    height:40px;
    position: absolute;
    z-index: 999;
    right: 20px;
    top: 10px;
    background-color: #fff;
    white-space: nowrap;
    text-align: center;
    border-radius: 5px;
}
#control>ul{
    margin-left: 5px;
   text-align: center;
   list-style: none;
}
#control>ul>li{
    float: left;
    padding-top: 5px;
    margin-right: 10px;;
}
#control>ul>li:nth-child(2){
padding-top: 0px;
width: 100px;
text-align: right;
}
#legend{
    z-index: 998;
    bottom: 10px;
    right: 20px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    position: absolute;
}
#valuetable{
    z-index: 999;
    left: 10px;
    top: 60px;
    width: 435px;
    height: 500px;
    position: absolute;
    background-color: #fff;
}
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
    #backMainMap{
        height: 40px;
        width: 40px;
        background-color: red;
        border-radius: 20px;
        z-index: 998;
        bottom: 20px;
        right: 20px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        position: absolute;
    }
.left{
    float: left;
    width: calc(100% - 50px);
    text-align: right;
    font-size: 14px;
    margin-top: 5px;
}

.right{
    float: right;
    width: 50px;
        margin-top: 5px;
}
     
</style>
<style >
  
</style>