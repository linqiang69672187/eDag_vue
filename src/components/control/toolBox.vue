<template>
    <div >
        <ul>
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
        border-style: solid;
        border-radius:2px;
        border-color: blueviolet;
        border-width: 2px;;
   }
</style>
