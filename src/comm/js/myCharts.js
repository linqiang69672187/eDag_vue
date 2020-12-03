/**
 * 各种画echarts图表的方法都封装在这里
 * 注意：这里echarts没有采用按需引入的方式，只是为了方便学习
 */

import echarts from 'echarts'

import { faFastForward } from '@fortawesome/fontawesome-free-solid'
const install = function(Vue) {
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                return {
                    //画一条简单的线
                    line1: function (id) {
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();

                        const optionData = {
                            xAxis: {
                                type: 'category',
                                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: [820, 932, 901, 934, 1290, 1330, 1320],
                                type: 'line',
                                smooth: true
                            }]
                        };

                        this.chart.setOption(optionData);
                    },
                    scatter:function(id,x1,y1,x2,y2,x3,y3){
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();
                        const  option = {
                            xAxis: {},
                            yAxis: {},
                            series: [{
                                symbolSize: 30,
                                data: [
                                    [x1, y1],
                                    [x2, y2],
                                    [x3, y3],              
                                ],
                                type: 'scatter',
                                itemStyle: {
                                    normal: {
                                        shadowBlur: 10,
                                        shadowColor: 'rgba(25, 100, 150, 0.5)',
                                        shadowOffsetY: 5,
                                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                            offset: 0,
                                            color: 'rgb(129, 227, 238)'
                                        }, {
                                            offset: 1,
                                            color: 'rgb(25, 183, 207)'
                                        }])
                                    }
                                }
                            },
                            {
                                symbolSize: 5,
                                data: [
                                    [0, 0],     
                                  
                                ],
                                type: 'scatter'
                            }
                                
                        ]
                        };
                        this.chart.setOption(option);
                        let that =this;
                        let updatedata = function(d1,d2,d3,trilateration){
                            option.series[1].data.pop();
                            option.series[1].data.push([trilateration.x,trilateration.y])

                            that.chart.setOption(option);
                         };
                                      
                      
                        return updatedata;

                    },
                    dynamicline:function(id){
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();                                          
                        let  option = {
                            title: {
                                text: '',
                                subtext: ''
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    crossStyle: {
                                        color: '#999'
                                    },
                                    label:{
                                        backgroundColor:'#000'
                                    }
                                },
                             
                            },
                            grid:{x:40,y:60,x2:40,y2:30},
                            legend: {
                                data:['在线时长','在线数量' ],
                                textStyle:{
                                    color:'#fff'
                                }
                            },
                            dataZoom: {
                                show: false,
                                start: 0,
                                end: 100
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                  
                                    axisPointer: {
                                        type: 'shadow'
                                    },
                                    data:['00:00:00'],
                                    axisLine:{
                                        lineStyle:{
                                            color:'#fff'
                                        } 
                                     },
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    scale: true,
                                    splitLine: {
                                        show: false
                                    },
                                    axisLabel:{
                                        color:'#fff',
                                        formatter: function(value,index){
                                                    		var value;
                                                    		if (value >=10000) {
                                                    			value = value/1000+'k';
                                                    		}else if(value <10000){
                                                    			value = value;
                                                    		}
                                                    		return value
                                                    	}
                                         ,
                                    },
                                    
                                       
                                    name: '在线时长(H)',
                                   // max: 30,
                                    nameTextStyle:{
                                        color:'#fff'
                                    },
                                    min: 0,
                                    boundaryGap: [0.2, 0.2],
                                    axisLine:{
                                       lineStyle:{
                                           color:'#fff'
                                       } 
                                    }
                                },
                                {
                                    type: 'value',
                                    scale: true,
                                    name: '在线数量(个)',
                                    nameTextStyle:{
                                        color:'#fff'
                                    },
                                    minInterval: 1, 
                                    axisLabel:{
                                        color:'#fff',
                                        formatter: function(value,index){
                                                    		var value;
                                                    		if (value >=10000) {
                                                    			value = value/1000+'k';
                                                    		}else if(value <10000){
                                                    			value = value;
                                                    		}
                                                    		return value
                                                    	}
                                         ,
                                    },
                                    splitLine: {
                                        show: false
                                    },
                                    min: 0,
                                    boundaryGap: [0.2, 0.2],
                                    axisLine:{
                                       lineStyle:{
                                           color:'#fff'
                                       } 
                                    }
                                }
                            ],
                            series: [
                                {
                                    name:'在线时长',
                                    type:'line',
                                  
                                    smooth:true, 
                                    
                                    itemStyle: {
                                        color: 'rgb(43, 129, 190)'
                                    },
                                    areaStyle: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgb(4, 38, 87)'
                                        }, {
                                            offset: 1,
                                            color: 'rgb(237, 46, 96)'
                                        }])
                                    },
                                
                                    data:[0]
                                },
                                {
                                    name:'在线数量',
                                    type:'line',
                                    smooth:false,
                                    itemStyle: {
                                        color: 'rgb(180, 255, 11)'
                                    },
                                    areaStyle: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgb(255, 255, 68)'
                                        }, {
                                            offset: 1,
                                            color: 'rgb(0, 70, 131)'
                                        }])
                                    },
                                    yAxisIndex: 1,
                                    data:[0]
                                }
                            ]
                        };
                       
                        this.chart.setOption(option);
                      
                        let that =this;
                        let updatedata = function (onlinetime,onlinecount,tonlinetime,tonlinecount){
                          
                           if(tonlinetime){
                            option.legend.data.splice(0);
                            option.legend.data.push(tonlinetime);
                            option.legend.data.push(tonlinecount);
                            option.series[0].name=tonlinetime;
                            option.series[1].name=tonlinecount;
                            option.yAxis[0].name=tonlinetime+"(H)";
                            option.yAxis[1].name=tonlinecount+"(n)";
                           }
                           else{
                            let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');                        
                            var data0 = option.series[0].data;
                            var data1 = option.series[1].data;  
                            if (data0.length>30){
                                option.xAxis[0].data.shift();
                                option.series[0].data.shift();
                                option.series[1].data.shift();
                            }            
                            data0.push((onlinetime));                         
                            data1.push(onlinecount); 
                           let max0= Math.ceil(data0.reduce(function(a , b){
                                return b > a ? b : a;
                                })/10)*10; 
                           let max1= Math.ceil(data1.reduce(function(a , b){
                                return b > a ? b : a;
                                })/10)*10;                      
                            option.xAxis[0].data.push(axisData);  
                            option.yAxis[0].max=max0;
                            option.yAxis[1].max=max1;  
                          }
                          that.chart.setOption(option);
                           
                        }
                       return updatedata;
                    },
                    drawmap:function(id){ 
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();
                        this.chart.showLoading();
                        let that =this;
                        Vue.axios.get('app/data/Json/hangzhou.json', {
                            params: 'data'
                          }).then((res) => {
                         that.chart.hideLoading();
                         echarts.registerMap('HZ', res.data);
                         console.info(res.data);
                            
                        var option = {
                            title: {
                                text: '',
                                subtext: '',
                                sublink: '',
                                left: 'center'
                            },
                            tooltip: {
                                trigger: 'item',
                                showDelay: 0,
                                transitionDuration: 0.2,
                                formatter: function (params) {
                                    var value = params.value;
                                    return params.seriesName + '<br/>' + params.name + ': ' + value;
                                }
                            },
                            series: [
                                {
                                    name: '设备数量',
                                    type: 'map',
                                    roam: true,
                                    map: 'HZ',
                                    itemStyle:{
                                        //默认显示地图地名
                                        normal:{label:{show:true}},
                                        emphasis:{label:{show:true}}
                                    },
                                    // 文本位置修正
                                    textFixed: {
                                        Alaska: [20, -20]
                                    },
                                    data:[
                                
                                  
                                        {name: '西湖区', value: 11},
                                        {name: '拱墅区', value: 12},
                                        {name: '上城区', value: 14},
                                        {name: '下城区', value: 15},
                                        {name: '江干区', value: 11},
                                        {name: '萧山区', value: 12},
                                       
                                    ],
                                }
                            ]
                        };
                        console.info(this.chart);  
                        that.chart.setOption(option);
                       
                          }).catch((err) => {
                            console.log(err)
                            alert('请求出错！')
                          })
                    },
                    gaugeindex:function(id){
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();
                        
                        let option = {
                            tooltip : {
                                formatter: "{a} <br/>{b} : {c}%"
                            },
                   
                         
                            toolbox: {
                                show:false,
                                feature: {
                                    restore: {},
                                    saveAsImage: {}
                                }
                            },
                            series: [
                                {
                                    radius: '90%',
                                    name: '在线指标',
                                    type: 'gauge',
                                    detail: {formatter:'{value}%'},
                                    data: [{value: 0, name: '在线率'}],
                                    axisLine: {            // 坐标轴线
                                        lineStyle: {       // 属性lineStyle控制线条样式
                                            color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                                            width: 3,
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 10
                                        }
                                    },
                                    axisLabel: {            // 坐标轴小标记
                                        textStyle: {       // 属性lineStyle控制线条样式
                                            fontWeight: 'bolder',
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 10
                                        }
                                    },
                                    axisTick: {            // 坐标轴小标记
                                        length :15,        // 属性length控制线长
                                        lineStyle: {       // 属性lineStyle控制线条样式
                                            color: 'auto',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 10
                                        }
                                    },
                                    splitLine: {           // 分隔线
                                        length :25,         // 属性length控制线长
                                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                            width:3,
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 10
                                        }
                                    },
                                    pointer: {           // 分隔线
                                        shadowColor : '#fff', //默认透明
                                        shadowBlur: 5
                                    },
                                    title : {
                                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                            fontWeight: 'bolder',
                                            fontSize: 14,
                                        
                                            fontStyle: 'italic',
                                            color: '#fff',
                                            shadowColor : '#fff', //默认透明
                                            shadowBlur: 10
                                        }
                                    },
                                    detail : {
                                        backgroundColor: 'rgba(30,144,255,0.8)',
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        shadowColor : '#fff', //默认透明
                                        shadowBlur: 5,
                                        offsetCenter: [0, '70%'],       // x, y，单位px
                                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                            fontWeight: 'bolder',
                                            color: '#fff',
                                            fontSize:12,
                                        }
                                    },
                                }
                            ]
                        };

                        this.chart.setOption(option);
                        let _this =this;
                        let updatedata = function (onlinecount,deviececount,zxzb_label,zxl_label){
                            if (zxzb_label){
                                option.series[0].name=zxzb_label;
                                option.series[0].data[0].name=zxl_label;
                            }
                            else{
                            let val = (onlinecount*100/deviececount).toFixed(2);
                            option.series[0].data[0].value = val;
                            
                            }
                            _this.chart.setOption(option,true);
                        }
                        return updatedata;
                    },
                    echarbar:function(id){
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();
                        let autoPlayvalue =true;
                        let option = {
                            baseOption:{
                                timeline: {
                                  
                                    axisType: 'category',
                                    
                                    autoPlay: true,
                                  
                                    playInterval: 5000,
                                    bottom:-5,
                                    data: ['1','2'],
                                    label: null,
                                    padding:0,
                                    controlStyle:{
                                        showPrevBtn:false,
                                        showNextBtn:false,
                                        color:'#fff',
                                        borderColor:'#B4FF0B',
                                    }
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross',
                                        crossStyle: {
                                            color: '#999'
                                        },
                                        label:{
                                            backgroundColor:'#000'
                                        }
                                    },
                                 
                                },
                                grid:{x:40,y:35,x2:40,y2:55},
                                toolbox: {
                                    show: false,
                                },
                                legend: {
                                    data:['在线时长','在线数量'],
                                    textStyle:{
                                        color:'#fff',
                                       
                                    }
                                },
                                xAxis: [
                                    {
                                        type: 'category',
                                      
                                        axisPointer: {
                                            type: 'shadow'
                                        },
                                        axisLine:{
                                            lineStyle:{
                                                color:'#fff'
                                            } 
                                         },
                                    }
                                ],
                                yAxis: [
                                    {
                                        type: 'value',
                                        name: '在线时长(H)',
                                        min: 0,
                                
                                   
                                        splitLine: {
                                            show: false
                                        },
                                        axisLabel: {
                                            formatter: '{value} H'
                                        },
                                        axisLabel:{
                                            color:'#fff',
                                            formatter: function(value,index){
                                                        		var value;
                                                        		if (value >=10000) {
                                                        			value = value/1000+'k';
                                                        		}else if(value <10000){
                                                        			value = value;
                                                        		}
                                                        		return value
                                                        	}
                                             ,
                                        },
                                        nameTextStyle:{
                                            color:'#fff'
                                        },
                                        axisLine:{
                                            lineStyle:{
                                                color:'#fff'
                                            } 
                                         }
    
                                    },
                                    {
                                        type: 'value',
                                        name: '在线数量(个)',
                                        min: 0,
                                        minInterval: 1,                            
                                        splitLine: {
                                            show: false
                                        },
                                        axisLabel: {
                                            formatter: '{value} '
                                        },
                                        nameTextStyle:{
                                            color:'#fff'
                                        },
                                        axisLine:{
                                            lineStyle:{
                                                color:'#fff'
                                            } ,
                                            formatter: function(value,index){
                                                        		var value;
                                                        		if (value >=10000) {
                                                        			value = value/1000+'k';
                                                        		}else if(value <10000){
                                                        			value = value;
                                                        		}
                                                        		return value
                                                        	}
                                             ,
                                         }
                                    }
                                ],
                                series: [
                                    {
                                        name:'在线时长',
                                        type:'bar',
                                        itemStyle: {
                                            color:  'rgb(43, 129, 190)',
                                            barBorderRadius:[5, 5, 0, 0],
    
                                        },
                                       // data:[12, 4, 7, 8, 5, 7,15],
                                        markPoint : {
                                            data : [
                                               
                                                {type : 'min', name: 'min'}
                                            ]
                                            
                                        },
                                    },
                                    {
                                        name:'在线数量',
                                        type:'bar',
                                        itemStyle: {
                                            color:'rgb(180, 255, 11)',
                                            barBorderRadius:[5, 5, 0, 0],
                                        },
                                     
                                        yAxisIndex: 1,
                                        //data:[2.6, 5.9, 9.0, 26.4, 18.7, 20.7,17]
                                    }
                                ]
                            },
                            options: []
                        };

                        this.chart.setOption(option);
                    
                        let that =this;
                        let updatedata = function(data,tonlinetime,tonlinecount){
                            if(tonlinetime){
                                option.baseOption.legend.data.splice(0);
                                option.baseOption.legend.data.push(tonlinetime);
                                option.baseOption.legend.data.push(tonlinecount);
                                option.baseOption.series[0].name=tonlinetime;
                                option.baseOption.series[1].name=tonlinecount;
                                option.baseOption.yAxis[0].name=tonlinetime+"(H)";
                                option.baseOption.yAxis[1].name=tonlinecount+"(n)";
                                option.baseOption.timeline.autoPlay=that.autoPlayvalue;
                                that.chart.setOption(option);
                                return;
                            }
                            let count =  Math.ceil(data.length / 7); 

                            if (count<2){
                                option.baseOption.timeline.show=false;
                                option.baseOption.grid={x:40,y:35,x2:40,y2:35}
                               
                            }
                            else{
                                option.baseOption.timeline.show=true;
                                option.baseOption.grid={x:40,y:35,x2:40,y2:55}
                            }                     
                            option.baseOption.timeline.data.length=0;
                          
                            option.options.length=0;
                            for (let i = 0; i < count; i++) { 
                                option.baseOption.timeline.data.push(i+1);
                             
                                let dataonlinetime=[];
                                let dataonlinecount=[];
                                let dataxAxis=[];
                                for (let ndata = 0; ndata <7; ndata++) { 
                                    if (i*7+ndata>=data.length) break;
                                    dataonlinetime.push((data[i*7+ndata].onlineTime));
                                    dataonlinecount.push(data[i*7+ndata].onlineTerminal);
                                    dataxAxis.push(data[i*7+ndata].entityName)
                                }
                                let series =[];
                                series.push({data:dataonlinetime});   
                                series.push({data:dataonlinecount});   
                                let xAxis=[];
                                xAxis.push({data:dataxAxis});
                                option.options.push({series:series,xAxis:xAxis});
                             }
                 
                     
                            option.baseOption.timeline.autoPlay = autoPlayvalue;
                            that.chart.setOption(option);
                         };
                        this.chart.on('timelinePlayChanged', function(param){
                            autoPlayvalue = param.playState;
                         });             
                      
                        return updatedata;
                    },
                    Basestationecharbar:function(id){
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();
                        let autoPlayvalue =true;
                        let option = {
                            baseOption:{
                                timeline: {
                                  
                                    axisType: 'category',
                                    
                                    autoPlay: true,
                                  
                                    playInterval: 5000,
                                    bottom:-5,
                                    data: ['1','2'],
                                    label: null,
                                    padding:0,
                                    controlStyle:{
                                        showPrevBtn:false,
                                        showNextBtn:false,
                                        color:'#fff',
                                        borderColor:'#B4FF0B',
                                    }
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross',
                                        crossStyle: {
                                            color: '#999'
                                        },
                                        label:{
                                            backgroundColor:'#000'
                                        }
                                    },
                                 
                                },
                                grid:{x:40,y:35,x2:40,y2:55},
                                toolbox: {
                                    show: false,
                                },
                                legend: {
                                    data:['在线数量'],
                                    textStyle:{
                                        color:'#fff',
                                       
                                    }
                                },
                                xAxis: [
                                    {
                                        type: 'category',
                                      
                                        axisPointer: {
                                            type: 'shadow'
                                        },
                                        axisLine:{
                                            lineStyle:{
                                                color:'#fff'
                                            } 
                                         },
                                    }
                                ],
                                yAxis: [                                   
                                    {
                                        type: 'value',
                                        name: '在线数量(个)',
                                        min: 0,
                                        minInterval: 1,                           
                                        splitLine: {
                                            show: false
                                        },
                                        axisLabel: {
                                            formatter: '{value} '
                                        },
                                        nameTextStyle:{
                                            color:'#fff'
                                        },
                                        axisLine:{
                                            lineStyle:{
                                                color:'#fff'
                                            } ,
                                            formatter: function(value,index){
                                                        		var value;
                                                        		if (value >=10000) {
                                                        			value = value/1000+'k';
                                                        		}else if(value <10000){
                                                        			value = value;
                                                        		}
                                                        		return value
                                                        	}
                                             ,
                                         }
                                    }
                                ],
                                series: [
                                    {
                                        name:'在线数量',
                                        type:'bar',
                                        itemStyle: {
                                            color:  'rgb(43, 129, 190)',
                                            barBorderRadius:[5, 5, 0, 0],
    
                                        },
                                       // data:[12, 4, 7, 8, 5, 7,15],
                                        markPoint : {
                                            data : [
                                               
                                                {type : 'min', name: 'min'}
                                            ]
                                            
                                        },
                                    }
                                ]
                            },
                            options: []
                        };
                        this.chart.setOption(option);
                        let that =this;
                        let updatedata = function(data,tonlinecount){
                            if(tonlinecount){
                                option.baseOption.legend.data.splice(0);
                                option.baseOption.legend.data.push(tonlinecount);
                                option.baseOption.series[0].name=tonlinecount;
                                option.baseOption.yAxis[0].name=tonlinecount+"(n)";
                                option.baseOption.timeline.autoPlay=that.autoPlayvalue;
                                that.chart.setOption(option);
                                return;
                            }
                            let count =  Math.ceil(data.length / 30); 

                            if (count<2){
                                option.baseOption.timeline.show=false;
                                option.baseOption.grid={x:40,y:35,x2:40,y2:35}
                               
                            }
                            else{
                                option.baseOption.timeline.show=true;
                                option.baseOption.grid={x:40,y:35,x2:40,y2:55}
                            }                     
                            option.baseOption.timeline.data.length=0;
                            option.options.length=0;
                            for (let i = 0; i < count; i++) { 
                                option.baseOption.timeline.data.push(i+1);
                                let dataonlinecount=[];
                                let dataxAxis=[];
                                for (let ndata = 0; ndata <30; ndata++) { 
                                    if (i*30+ndata>=data.length) break;
                                    dataonlinecount.push(data[i*30+ndata].onlineTerminal);
                                    dataxAxis.push(data[i*30+ndata].BsName)
                                }
                                let series =[];
                                series.push({data:dataonlinecount});   
                                let xAxis=[];
                                xAxis.push({data:dataxAxis});
                                option.options.push({series:series,xAxis:xAxis});
                             }
                             option.baseOption.timeline.autoPlay = autoPlayvalue;
                            that.chart.setOption(option);
                         };
                                      
                         this.chart.on('timelinePlayChanged', function(param){
                            autoPlayvalue = param.playState;
                         });  
                        return updatedata;
                    },
                  
                      
                }
            }
        }
    })
}

export default {
    install
}