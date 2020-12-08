<template>
 <div>
    <div  id="map"></div>
    <button class="Rssi" @click="changemap">查看场强</button>
 </div>

</template>
<script>



export default {
    data(){
       return{
         
           
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
             debugger;
                this.$emit('changemap','Heatmap')
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
    bottom: 300px;
    right: 300px;;
    position: absolute;
}
</style>