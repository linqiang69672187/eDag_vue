<template>
    <div>

       <div id="control">
           <ul>
               <li>  
                   <Select v-model="ssri" style="width:100px">
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                   </Select>
           </li>
               <li>选择起始时间：</li>
               <li>
                  <DatePicker :value="sdate" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
               </li>
           </ul>
          
       </div>
       <div id="legend">

       </div>
    </div>
</template>
<script>
import { Select,DatePicker   } from 'iview';

export default {
    data(){
        return{
                lockitems:[],//锁定的设备
                backgroundDiv: {
                    backgroundImage: 'url(' + require('@/assets/images/tabs_table_bg2.png') + ')'
                },
                map:null,
                htmap:null,
                 cityList: [
                    {
                        value: 'up',
                        label: '手台场强'
                    },
                    {
                        value: 'down',
                        label: '下行场强'
                    }
                ],
                ssri: 'up',
                legendLabel:'图例',
                sdate:[]
                
        }
    },
    mounted(){
        let date = new Date();
        let tYear = date.getFullYear();
        let m = dete.getMonth()+1 
        let tmonth = m.toString().length==1?"0"+m:m;
        let tdate =  date.getDate();
        this.sdate.push(tYear+'-'+tmonth+'-'+'01');
        this.sdate.push(tYear+'-'+tmonth+'-'+tdate);

        this.createLegend();
        this.createFeature();
        this.initMap();
    },
    methods:{
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
                        drawLabel(offsetX + rectWidth + 2, textOffsetHeight + offsetY, "#000", "fill", 0 + " dB", "12");
                        drawLabel(offsetX + rectWidth + 2, textOffsetHeight + offsetY + rectHeight / 4, "#000", "fill", "-80 dB", "12");
                        drawLabel(offsetX + rectWidth + 2, textOffsetHeight + offsetY + rectHeight / 2, "#000", "fill", "-90 dB", "12");
                        drawLabel(offsetX + rectWidth + 2, textOffsetHeight + offsetY + rectHeight * 3 / 4, "#000", "fill", "-100 dB", "12");
                        drawLabel(offsetX + rectWidth + 2, textOffsetHeight + offsetY + rectHeight, "#000", "fill", "-110 dB", "12");
                        drawLabel(offsetX + rectWidth + 2, textOffsetHeight + offsetY + rectHeight * 5 / 4, "#000", "fill", "-150 dB", "12");
                     let content = document.getElementById("legend");
                     content.appendChild(canvas);

            },
            
            createFeature () {
                  var source = new ol.source.Vector({})  
                        var heatData = [
                            {coordinates: [ 120.40, 30.19 ] ,properties: { u: 0.9,d:1 }},
                            { coordinates: [ 120.30, 30.60 ] ,properties: { u: 0.9,d:1 }},
                            { coordinates: [ 120.30, 30.60 ] ,properties: { u: 0.9,d:1}},
                            { coordinates: [ 120.30, 30.60 ] ,properties: { u: 0.9,d:1}},
                            { coordinates: [ 120.30, 30.60 ] ,properties: { u: 0.9,d:1}},
                            { coordinates: [ 120.30, 30.60 ] ,properties: { u: 0.9,d:1}},
                            { coordinates: [ 120.30, 30.60 ] ,properties: { u: 0.9,d:1}},
                            { coordinates: [ 120.30, 30.60 ] ,properties: { u: 0.9,d:1}},
                            { coordinates: [ 120.30, 30.60 ] ,properties: { u: 0.9,d:1}},
                            { coordinates: [ 120.30, 30.60 ] ,properties: { u: 0.9,d:1}},
                            { coordinates: [ 120.30, 30.60 ] ,properties: { u: 0.9,d:1}},
                            { coordinates: [ 120.30, 30.60 ] ,properties: { u: 0.9,d:1}},             
                            { coordinates: [ 120.214350, 30.3423 ] ,properties: { u: 0.9,d:1}},
                            { coordinates: [ 120.45656, 30.4545 ] ,properties: { u: 0.9,d:1}},
                            { coordinates: [ 120.78684, 30.1235 ] ,properties: { u: 0.9,d:1}},
                            { coordinates: [ 120.43543, 30.4378 ] ,properties: { u: 0.9,d:1}},
                            { coordinates: [ 120.506, 30.234 ] ,properties: { u: 0.9,d:1}},
                            { coordinates: [ 120.9087, 30.45345 ] ,properties: { u: 0.9,d:1}},
                            { coordinates: [ 120.8764, 30.1234 ] ,properties: { u: 0.9,d:1}},
                            { coordinates: [ 120.4753, 30.948 ] ,properties: { u: 0.9,d:1}},
                            { coordinates: [ 120.10, 30.789 ] ,properties: { u: 0.9,d:1}}
                        ];

                         heatData.forEach(element=>{
                               let geom = new ol.geom.Point(ol.proj.fromLonLat(element.coordinates));
                               let feature = new ol.Feature(geom);
                               feature.u = element.u;
                               feature.d = element.d;
                               feature.setStyle(
                                    new ol.style.Style({
                                        image: new ol.style.Circle({
                                            radius: 20,
                                            fill: new ol.style.Fill({
                                                color: '#999999'
                                            }),
                                        })
                                    })
                                );
                              source.addFeature(feature);
                         })
                    /*
                     var features = new ol.format.GeoJSON().readFeatures(heatData, {
                             dataProjection: 'EPSG:4326',
                             featureProjection: 'EPSG:3857'
                         });

                     features.forEach(element => {
                    element.setStyle(
                            new ol.style.Style({
                                 image: new ol.style.Circle({
                                     radius: 20,
                                     fill: new ol.style.Fill({
                                         color: '#3399CC'
                                     }),
                                 })
                             })
                        );

                     });

               */
                      this.htmap = new ol.layer.Vector({
                        source: source,
                       
                    });   
                    

                },  
            initMap() {
            //   var vector = new ol.layer.Heatmap({
            //         source: new ol.source.Vector({
            //             url: '/data/kml/2012_Earthquakes_Mag5.kml',
            //             format: new ol.format.KML({
            //             extractStyles: false,
            //             }),
            //         }),
            //         blur: 11,
            //         radius: 30,
            //         weight: function (feature) {
            //             // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
            //             // standards-violating <magnitude> tag in each Placemark.  We extract it from
            //             // the Placemark's name instead.
            //             var name = feature.get('name');
            //             var magnitude = parseFloat(name.substr(2));
            //             return magnitude - 5;
            //         },
            //         });

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
                    view: view,
                   
                }); 
            
                var offlineMapLayerParams = createBaseMapParameter(GISTYPE);
                var streetMapLayer = createStreetMapLayer(this.map, "offlineMapLayer", offlineMapLayerParams);//创建街景图
            
                this.map.addLayer(this.htmap);
            },
        },

    }
</script>
<style scoped>

#control{
    height:40px;
    width: 435px;
    position: absolute;
    z-index: 999;
    left: 10px;
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
padding-top: 10px;
width: 100px;
text-align: right;
}
#legend{
    z-index: 999;
    bottom: 20px;
    right: 20px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    position: absolute;
}

</style>
<style >

</style>