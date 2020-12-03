<template>
    <div class="hello">
        <!--生成二维码区域 -->
    <canvas id="canvas"></canvas>
     <slot></slot>
    </div>
</template>
<script>
import Vue from "vue"
import QRCode from "qrcode"
export default {
    data(){
        return{};
    },
    mounted(){
        //组件挂载的时候，调用生成二维码函数
        this.userqrcode()
    },
    methods:{
        userqrcode(){
            let canvas = document.getElementById("canvas");
            QRCode.toCanvas(canvas,"http://www.baidu.com",function(error){
                if(error){
                    console.error(error)
                }else{
                    console.info("success!")
                }
            })
        }
    }
}
</script>
