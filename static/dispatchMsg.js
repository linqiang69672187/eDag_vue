function REGMsg(msg, dispName){ 
              console.info(msg+'|'+dispName);
              //window.vue_notice.info(title,msg);
              //window.vue_notice.error(title,msg);
              window.vue_index.regmsg(msg,dispName);
}          
function CallMsg(issi,eventtype,msg,gssi,hookmethodsel){
    window.vue_dialplate.CallMsg(issi,eventtype,msg,gssi,hookmethodsel);
}
function SMSMsg(issi,smstype,msg,id, isconsume){
    window.vue_index.$refs.banner.newsmsIn(issi,smstype,msg,id, isconsume);
}
function openwindows(windowstr){
    alert(windowstr);
    console.info(windowstr);
    mycallfunction('DispatchFunc', 450, 600)
}
function GetTextByName(name){
    return "查看当前范围场强";
} 
var useprameters={};
useprameters.Emapurl="http://10.8.59.253:8081/";
useprameters.maptype ="png";
useprameters.maxLevel=16;
useprameters.minLevel=7;
useprameters.currentLevel=8;  //currentLevel
useprameters.PGIS_Center_lo="120.6179333";
useprameters.PGIS_Center_la="30.0452833";
useprameters.GISTYPE="tianditu"; //tianditu,google
useprameters.name = "zhej";
useprameters.usename = "LQ";
useprameters.servertime = "1571984937504";
useprameters.defaultLanguage="zh-CN";
useprameters.SystemType ="1";

useprameters.DTCZEnable = "1"; //动态重组是否启用 
useprameters.SMSEnable = "1"                                       //个短消息是否启用
useprameters.PullUp_ControlEnable = "1";                                //周期性上拉是否启用 
useprameters.GPS_ControlEnable = "1";                                 //GPS控制是否启用 
useprameters.DSSEnable = "1";                           //勤务管理

useprameters.PrivateCallEnable = "1"; 
useprameters.lockids=[
    {issi:'24001',lon:'123.2727667529',lat:'41.7786735631',name:'张警官',userid:'1'},
    {issi:'24002',lon:'123.2727667529',lat:'41.7786735631',name:'林警官',userid:'3'},
    {issi:'24003',lon:'123.2727667529',lat:'41.7786735631',name:'朱警官',userid:'2'}
]
useprameters.lockid='2'
function projectScreen(id,lon,lat){
console.info(id);

}

function LoadEvents(){
        function boxSelection(){
            console.info("boxSelection");
        }
        function zoomIn(){  //放大

        }
        function zoomOut(){ //缩小

        }
        return boxSelection;
}
//useprameters.lockids.splice(0, 1, {issi:'24001',lon:'120.1727667529',lat:'30.2166735631',name:'张1警官',userid:'1'});

//window.vue_index.$refs.banner.updateuseprameters();已准备好参数可以更新界面了
//window.vue_index.init();

/*
[‎2019/‎10/‎28 16:13] 张谦: 
<% 
                     if (ConfigurationManager.AppSettings["SystemType"].ToString() == "2") 
                     { 
                                 %>eTRA GIS_HELP_SEA/help.html<% 
                     } 
                     else if (ConfigurationManager.AppSettings["defaultLanguage"].ToString() == "zh-CN") 
                     { 
                                %>eTRA GIS_HELP/help.html<% 
                                
                     } 
                     else 
                     { 
                            %>eTRA GIS_HELP_En/help.html<% 
                     } 
           
                    
                    %>

*/
function manageRealTimeUserInStockadeLayer(){
    console.info('manageRealTimeUserInStockadeLayer')
}
function onClick(e, treeId, treeNode) { 


}
function displaypolicelistsdiv(){
    console.info("displaypolicelistsdiv");
}
 setTimeout(function(){
     window.vue_index.init();
     window.vue_index.updatelola();
 },3000)


 function showFSHeatMap() {
    //document.getElementById("contextmenu_container2").parentNode.style.display = "none";
    //heatMapManager.open();

    jsPanel.create({
        id: 'heatMapPanel',
        theme: 'primary',
        headerTitle: '场强',
        headerControls: {
            maximize: 'remove'
        },
        contentSize: {
            width: 1000,
            height: 500
        },
        contentOverflow: 'hidden',
        content: '<iframe scrolling="auto" frameborder="0" src="one.html" style="width:100%;height:100%;"></iframe>',
        callback: function () {

        }
    });
}

function heatmapwork(data){

        let worker = new SharedWorker('./static/heatmapHandler.js');
        worker.postMessage(data.data);
       worker.addEventListener('message',function(e){
            alert(e);
            
        },false);

        return;
        let _this =this;
                
        this.worker = this.$worker.run(n => {
            debugger;
            importScripts("ol-debug.js")
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
                })  
                return source;  
        }, [res.data])
    // 数组中为传递给worker的参数，可以传递多个，此案例为2
        .then(res =>{
        let source = this.htmap.getSource();
        source.clear();
        _this.htmap.setSource(res);
        }
        ) // res为worker计算结束return返回的结果数据，可以在.then里根据返回结果继续操作主线程后续任务
        .catch(e => console.log(e)) // 报错信息
}
