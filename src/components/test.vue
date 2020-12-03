<template>
  <div :style="backgroundDiv" id="scalet">
     <div v-if="showline" class="distanc">
         比例尺：1:20<br/>  基站:
         <i-switch   @on-change="initcanvas" v-model="openlocal"  size="large">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
          </i-switch>
          <br/>
          轨迹:
         <i-switch   @on-change="initcanvas" v-model="historytrace"  size="large">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch><Button @click="clearTrace" type="primary">清空轨迹</Button><br/>
          坐标线:
         <i-switch   @on-change="initcanvas" v-model="axois"  size="large">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch><br/>
        三边定位参考线:
         <i-switch   @on-change="initcanvas" v-model="userStatus"  size="large">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch><br/>
        坐标:{{mouseposition}}</div> 
     

      
      <canvas @click="startcompute" id="myCanvas" height="2000px" width="3500px">
      </canvas>
      <div style="display:none">
        <img ref="conf1" src="@/assets/images/BaseStation.png">
        <img ref="conf" src="@/assets/images/local_dw.png">
        <img ref="conf2" src="@/assets/images/north.png">
        <img ref="conf3" src="@/assets/images/pc.png">
     </div>
     
  </div>
</template>
<script>
import Vue from 'vue'
import { Switch,Button } from 'iview'
Vue.component('i-switch', Switch)

    export default {
        data () {
            return {//47米，51米  ,20倍放大1:20
              backgroundDiv: {
                            background: '#fff url(' + require('@/assets/images/dongxincad.jpg') + ') no-repeat scroll left center'
                    } ,
                   x1:0,   //第一个信标
                   y1:0,
                   d1:0,

                   x2:0,  //第二个信标
                   y2:0,
                   d2:0,

                   x3:0,  //第三个信标
                   y3:0,
                   d3:0,  
                   x:1430,
                   y:1600,                
                   Mark:[   //信标列表
                        {markid:1,x:3129,y:710},
                        {markid:2,x:2711,y:787+50},
                        {markid:3,x:2085,y:787+50},
                        {markid:4,x:1428,y:787+50}, 
                        {markid:5,x:535,y:787+50}, 
                        {markid:6,x:535,y:1508+50}, 
                        {markid:7,x:1428,y:1508+50}, 
                   ], 
                   userStatus:false,
                   inter:null,
                   showline:false,
                   openlocal:false,
                   historyposition:[],
                   historytrace:false,
                   axois:true,
                   mouseposition:'',
            }
        },
        mounted(){
            let _this = this;
            console.info(this.trilateration);
            this.initcanvas();
           this.inter = setInterval(() => {
               _this.interLoadData();
           }, 100);

          if(typeof(Worker)!=="undefined")
            {
                console.info('ok')
            }
            else
            {
                console.info('ok Sorry! No Web Worker support..')
            }
        },
        destroyed(){
            clearInterval(this.inter);
        },
         components:{
           Switch,Button,
         },
        methods: {
          clearTrace(){
              this.historyposition.splice(0);
          },
          initcanvas(){
          
              var c=document.getElementById("myCanvas");
 
              var ctx=c.getContext("2d");
              var ctxline=c.getContext("2d");
                   c.height=c.height;  

            


            //       ctx.strokeStyle="#fff"; 
            //      if(this.axois){
            //         for (let i=1;i<3;i++){
                
            //             ctx.moveTo(i*400,0); 
            //             ctx.lineTo(i*400,1200); 
            //             ctx.moveTo(0,i*400); 
            //             ctx.lineTo(1200,i*400);    
            //         } 
            //         ctx.stroke(); 
            //    }
                let img2 = this.$refs.conf2    
                ctx.drawImage(img2, 0,0)
                
               // let imgcad = this.$refs.conf3   
               // ctx.drawImage(imgcad, 0,0)



                // ctx.fillStyle='#fff';

                // ctx.strokeStyle="#333"; 
                // ctx.fillText("0,0", 0, 10); 
                // for (let i=1;i<12;i++){
                //     ctx.fillText(i*10+"米", i*200, 10); 
                //     ctx.fillText(i*10+"米", 0, 200*i); 
               
                // } 
               

                  
                

           
                let img1 = this.$refs.conf1
                 if(this.openlocal){
                for (let i=0;i<this.Mark.length;i++){
                   ctx.drawImage(img1, this.Mark[i].x-45,this.Mark[i].y-164)
                   //ctx.fillText("X:"+(this.Mark[i].x/20).toFixed(2)+',Y:'+(this.Mark[i].y/20).toFixed(2), this.Mark[i].x-25,this.Mark[i].y+20); 
                      
                }
              }
                ctx.stroke();
             
            //     if (this.userStatus){
                    

            //     ctxline.moveTo(this.x1,this.y1); 
            //     ctxline.lineTo(this.trilateration.x,this.trilateration.y);   
            //     ctxline.stroke(); 
              
            
            //     ctxline.moveTo(this.x2,this.y2); 
            //     ctxline.lineTo(this.trilateration.x,this.trilateration.y);   
            //     ctxline.stroke(); 
    
            //     ctxline.moveTo(this.x3,this.y3); 
            //     ctxline.lineTo(this.trilateration.x,this.trilateration.y);   
            //     ctxline.stroke(); 

            //     ctx.strokeStyle="#fff"; 
            //     ctx.beginPath();
            //     ctx.arc(this.x1,this.y1,this.d1,0, Math.PI * 2, false);
            //     ctx.stroke();
            //     ctx.beginPath();
            //     ctx.arc(this.x2,this.y2,this.d2,0, Math.PI * 2, false);
            //     ctx.stroke();      
            //     ctx.beginPath();
            //     ctx.arc(this.x3,this.y3,this.d3,0, Math.PI * 2, false);
            //     ctx.stroke();

            //  }
           



            
                 let img = this.$refs.conf3
        
                 ctx.drawImage(img, this.trilateration.x-60,this.trilateration.y-223);
           
                ctx.stroke(); 
            //  if (this.userStatus){
            //     ctx.font = "14px bold 黑体";
            //     ctx.fillStyle = "#fff";
            //     ctx.fillText("距离:"+(this.d1/20).toFixed(2), (this.x1+this.trilateration.x)/2,(this.y1+this.trilateration.y)/2); 
            //     ctx.fillText("距离:"+(this.d2/20).toFixed(2), (this.x2+this.trilateration.x)/2,(this.y2+this.trilateration.y)/2); 
            //     ctx.fillText("距离:"+(this.d3/20).toFixed(2), (this.x3+this.trilateration.x)/2,(this.y3+this.trilateration.y)/2); 
            //     }
            //  ctx.stroke();
             
            //   if (this.historyposition.length>0&&this.historytrace&&this.openlocal){
            //    ctx.moveTo(this.historyposition[0][0],this.historyposition[0][1]); 
            //     for (let i = 0; i < this.historyposition.length-1; i++) { 
            //         ctx.lineTo(this.historyposition[i+1][0],this.historyposition[i+1][1]);   
            //     }
            //   }
            // ctx.stroke();
             
            //    for (let i=0;i<this.Mark.length;i++){
            //         ctx.font = '38pt Arial'; //字体样式
            //         ctx.fillStyle = 'red'; //填充线样式
            //        ctx.fillText(this.Mark[i].markid, this.Mark[i].x,this.Mark[i].y); 
                      
            //     }

          },
          startcompute(e){
              this.showline=!this.showline; 
              this.mouseposition=e.clientX+'/'+e.clientY;
          },
       
         interLoadData(){
             let _this = this;
              Vue.axios.get('/Handlers/Indoor_position.ashx', { // ，/app/data/json/Indoor_position.json，/Handlers/Indoor_position.ashx，
                            params: {
                                times:new Date().getTime(),
                            }
                          }).then((res) => {
                              _this.x= (parseFloat(res.data[0].BsID));
                              _this.y=(parseFloat(res.data[0].distance));

                            //  for (let i=0;i<_this.Mark.length;i++){
                            //     if (res.data[0].BsID==_this.Mark[i].markid){
                            //           _this.d1 = parseFloat(res.data[0].distance)*20;
                            //           _this.x1 = _this.Mark[i].x;
                            //           _this.y1 = _this.Mark[i].y;
                            //     }
                            //      if (res.data[1].BsID==_this.Mark[i].markid){
                            //           _this.d2 = parseFloat(res.data[1].distance)*20;
                            //           _this.x2 = _this.Mark[i].x;
                            //           _this.y2 = _this.Mark[i].y;
                            //     }

                            //     if (res.data[2].BsID==_this.Mark[i].markid){
                            //           _this.d3 = parseFloat(res.data[2].distance)*20;
                            //           _this.x3 = _this.Mark[i].x;
                            //           _this.y3 = _this.Mark[i].y;
                            //     }
                            //  }  
                             _this.initcanvas();

                          }).catch((err) => {
                          console.log(err)
                           
                   })

           },
           
        },
        computed:{
            trilateration(){
                 let x=0,y=0;
                 x=this.x;
                 y=this.y;

                //  let a11 = 2*(this.x1-this.x3);
                //  let a12 = 2*(this.y1-this.y3);
                //  let b1=Math.pow(this.x1,2)-Math.pow(this.x3,2) +Math.pow(this.y1,2)-Math.pow(this.y3,2) +Math.pow(this.d3,2)-Math.pow(this.d1,2);
                //  let a21 = 2*(this.x2-this.x3);
                //  let a22 = 2*(this.y2-this.y3);
                //  let b2 = Math.pow(this.x2,2)-Math.pow(this.x3,2) +Math.pow(this.y2,2)-Math.pow(this.y3,2) +Math.pow(this.d3,2)-Math.pow(this.d2,2);
                //      x=(b1*a22-a12*b2)/(a11*a22-a12*a21);
                //      y=(a11*b2-b1*a21)/(a11*a22-a12*a21);
                // this.historyposition.push([x,y]);
                return {'x':x,'y':y};
            }
        }
    }
</script>
<style scoped>
   *{
            margin: 0;
            padding:0;
			}
			canvas{
				margin-left: 10px;
                margin-top: 10px;
				border: 1px solid #999 ;
	}
    #scalet{
        width: 100%;
        height: 100%;
        font-size: 14px;
        overflow-y: auto;
        text-align: left;
        background-color: #000;

    }
    #myCanvas{
        left: 0;
        top: 0px;
    }
    .distanc{
        text-align: left;
        position: absolute;
        right:30px;
        bottom:  20px;
        color: #fff;
    
    }
    span{
        margin-bottom: 5px;
    }
   button{
       margin-left: 5px;
       padding: 3px;
   }
</style>