<template>
    <div>
  <Heatmap height="600px"></Heatmap>
      <Modal v-model="modal11" width="800px" :footer-hide="true"   >
        <div class="modaldiv"></div>
      </Modal>
      <Button @click="modal11 = true" >全屏</Button>
    </div>

</template>
<script>

import {Modal} from 'iview';
import Heatmap from '@/components/panel/Heatmap.vue'



export default {
    data(){
       return{
           modal11: false,
           
       }
    },

    mounted() {
    
    },
    computed:{
       
            
        
    },
    components:{
        Heatmap,

   
    },
    methods:{
        
    }
}
</script>
<style scoped>
.modaldiv,.modaldiv>div{
  
}
</style>