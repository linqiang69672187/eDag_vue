<template>
    <div >   
        <div  class="css_animation "><div class="laydiv"></div><div class="fontdiv cssrota" ><i class="fas fa-location-arrow"></i></div><div class="circle"></div></div>
    </div>
</template>
<script>
import math from "@/mixin/math"
import {Map,View} from "ol";
import TileLayer from 'ol/layer/Tile';
import sourceXYZ from 'ol/source/XYZ';
import layerGroup from 'ol/layer/Group';
import {defaults as defaultControls} from 'ol/control';
import FullScreen from 'ol/control/FullScreen.js';
import {transform} from 'ol/proj.js';
import {Vector as VectorSource} from 'ol/source.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import {Circle as CircleStyle, Fill, Stroke, Style,Text} from 'ol/style.js';
import { debug } from 'util';
import Overlay from 'ol/Overlay.js';

let noticemod;
export default {
    mounted(){
        this.initMap();
    },
    mixins:[math,],
    data: function () {
        return {
            type: this.moveType,
            coordinates:[]
        }
        },
   props:['moveType'],
    destroyed(){
            clearInterval(noticemod);
        },
   methods:{
       moveFeature(event){
       },
        initMap() {
       
       var url = ""+"baidu/tiles/{z}/{x}/{-y}.jpg";
       var center;
            switch(this.type){
                case "1":
                  center= [121.23303583068851, 28.152394518616234]; 
                     break;
                  case "2":                  
                  center= [121.26103583068851, 28.452394518616234]; 
                   break;
                case "3":                  
                  center= [121.23103583068851, 28.152394518616234]; 
                   break;
                case "4":                  
                  center= [121.27103583068851, 28.152394518616234]; 
                   break; 
                case "5":                  
                  center= [121.25103583068851, 28.252394518616234]; 
                break;      
                default:
                  center= [121.26303583068851, 28.652394518616234]; 
                    break;
            }
        var baiduMapLayer2 = new TileLayer({
            source: new sourceXYZ({
                minZoom: 2,
                maxZoom: 14,
                projection: 'EPSG:3857',
                tileSize: 256,
                url: url
            })
        })
   
        var point_div = this.$el.getElementsByClassName("css_animation")[0];
        var point_overlay = new Overlay({
            element: point_div,
            positioning: 'center-center'
        });
        

    

    //var fullScreenControl = new FullScreen({
    //    target:"fullscreenid"
   // });
    // 创建地图
           
    var map = new Map({
        layers: [new layerGroup({
            'title': '基础图层',
            layers: [baiduMapLayer2]
        })
        ],
        controls: defaultControls({
            attribution: false,
            rotate: false,
            zoom:false
        }).extend([]),
        view: new View({
            // 设置地图中心
            center: transform(center, 'EPSG:4326', 'EPSG:3857'),
            zoom: 14,
            maxZoom: 17,
            minZoom: 10

        }),
        target: this.$el
    });
    this.coordinates= transform(center, 'EPSG:4326', 'EPSG:3857');
    map.addOverlay(point_overlay);
     if (this.type!=0){
         var that = this;
        noticemod= setInterval(function (){
              //   var feature =vectorSource.getFeatures();
              
                   var cd1= that.getRandomNumberByRange(0,2);
                   var cd2 = that.getRandomNumberByRange(0,2);
                    switch (cd1){
                        case 1:
                            that.coordinates[0]+=100;
                              break;
                        case 2:
                            that.coordinates[0]-=100;
                        break;
                        default:
                            break;
                    }
                     switch (cd2){
                        case 1:
                            that.coordinates[1]+=100;
                              break;
                        case 2:
                            that.coordinates[1]-=100;
                        break;
                        default:
                            break;
                    }
                    let rotationvalue=0;
                    switch(cd1+""+cd2){
                        case '00':
                            rotationvalue=0;
                            break;
                        case '01':
                             rotationvalue=0;
                             break;
                        case '02':
                           rotationvalue=180;  
                           break; 
                        case '10':
                            rotationvalue=90;
                            break;
                        case '11':
                             rotationvalue=45;
                             break;
                        case '12':
                           rotationvalue=135;  
                           break; 
                        case '20':
                            rotationvalue=270;
                            break;
                        case '21':
                             rotationvalue=315;
                             break;
                        case '22':
                             rotationvalue=225;  
                             break;         

                    }
                    
                   //feature[0].setGeometry(new Point(coordinates));
                   point_div.style.transform = 'rotate('+rotationvalue+'deg)';
                  // map.getView().animate({rotation:rotationvalue});
                   map.getView().animate({center:that.coordinates}); //,{rotation:rotationvalue}
                   point_overlay.setPosition(that.coordinates);
                 //  point_div.style.transform = 'rotate(0deg)';
                  // console.log(that.coordinates);
                  // map.on('postcompose', moveFeature);
                   map.render();
                 
                           
         }, 3000);
        
        } 


      
        }
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

</style>
