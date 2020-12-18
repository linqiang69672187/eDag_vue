onmessage =function(ev){

 postMessage(handerheat(ev));
}
function handerheat(data){
    
  //  importScripts("./OpenLayers/ol/source/Vector.js")
    let source = new ol.source.Vector({}) ; 
   
        data.forEach(element=>{
                let geom = new ol.geom.Point(ol.proj.fromLonLat(element.co));
                let feature = new ol.Feature({
                    geometry: geom,
                    MS : element.MS,
                    UI : element.UI,
                    issi : element.issi,
                });
                
                let Rssi = this.ssri=="MS"?parseInt(element.MS):parseInt(element.UI);
                let color=this.fillColor(Rssi)
                feature.setStyle(
                        new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 5,
                                fill: new ol.style.Fill({
                                    color: color
                                }),
                            })
                        })
                    );
                source.addFeature(feature);
    });
    return source;
    
}
