<template>
 <div class="divmap" :class="{minimap}">
    <div  id="map"></div>
    <button class="Rssi" @click="changemap">查看场强</button>
 </div>

</template>
<script>



export default {
    data(){
       return{
         minimap:true,

           
       }
    },

    mounted() {
    
    },
    computed:{
       
            
        
    },
    components:{
       
   
    },
    methods:{
         changemap(){
                this.$emit('changemap','Heatmap');
                this.minimap=true;
         },
         fullmap(){
               
                this.minimap=false;
         },
         
    }
}
</script>
<style scoped>
#map {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
.Rssi{
    bottom: 130px;
    right: 130px;;
    position: absolute;
    cursor: pointer;
}
 .minimap{
      transform: translateX(3000px);
       opacity: 0;
       z-index: -1;
       
    }
    .divmap{
        width:100%;
       transition:all  1;
    -moz-transition:all  1s; /* Firefox 4 */
    -webkit-transition:all  1s; /* Safari and Chrome */
    -o-transition:all  1s; /* Opera */
    }
</style>