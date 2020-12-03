<template>
<div >
    <object classid="clsid:C9C49299-69B6-4080-8747-8801C8397B3B"  id="SCactionX" codebase="CallActiveocx.cab#version=4,2,1,0"> 
    </object>
</div>
</template>
<script>

    export default {
        data () {
                return {          
                //
                dataCount:0,

                }
        },
        mixins:[],
        props:['linstatus'],
        components:{
        },
        methods: {
            DispatchUserReg(){
                // let scactionX = document.getElementById("qq").firstChild
                let scactionX = document.getElementById("SCactionX");
                scactionX.DispatchUserReg('东方通信GIS指挥调度台','gongzl');
            }
            
            
         },
        created(){
                
        },
        mounted() {
         this.DispatchUserReg();     

       },
       
    }
</script>
<style scoped>
div{
  display: none;
}
</style>