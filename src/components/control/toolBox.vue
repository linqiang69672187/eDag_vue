<template>
    <div >
        <ul>
            <li><div><i class="fa fa-object-group"></i></div></li>
            <li><div><i class="fa fa-users"></i></div></li>  
            <li><div><i class="fas fa-window-maximize"></i></div></li>  
            <li><div><i class="fas fa-window-maximize"></i></div></li>  
            <li><div><i class="fas fa-window-maximize"></i></div></li>  
            <li><div><i class="fas fa-window-maximize"></i></div></li>  
            <li><div><i class="fas fa-window-maximize"></i></div></li>  
        </ul>
    </div>
</template>
<script>

export default {
    data () {
        return {
                shwophonebg: false,
                
            }
        },
    mounted(){
    },
    methods:{
    }

}
</script>
<style scoped>
    ul{
    display:inline;
    white-space: nowrap;
    }
   ul li{
        display:inline-block;
      
   }
   ul div{
        width: 30px;
        height: 30px;
        line-height: 30px;
        
   
   }
</style>
