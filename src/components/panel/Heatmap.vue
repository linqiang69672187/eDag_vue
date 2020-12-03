<template>
    <div>
       <div  class="css_animation ">
            <div class="laydiv"></div>
       </div>
    </div>
</template>
<script>


export default {
    data(){
        return{
                lockitems:[],//锁定的设备
                backgroundDiv: {
                    backgroundImage: 'url(' + require('@/assets/images/tabs_table_bg2.png') + ')'
                },
                map:null,
                htmap:null,
                
        }
    },
    mounted(){
     this.createFeature();
     this.initMap();
    },
    methods:{
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
.row{
    width: 100%; 
    height:220px;
    background:no-repeat no-repeat;;
    background-size: 100%;  
    background-color: #fff;
    overflow-x: auto;
    overflow-y: hidden;
}



</style>
<style >

</style>