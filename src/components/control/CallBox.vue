<template>
    <div class="callbox">
        <ul>
            <li><div v-show="shwophonebg" class="callboxbg heartBeat animated  infinite"></div><a @mouseover="shwophonebg=true" @mouseout="shwophonebg=false"><div><i class="material-icons">mic</i></div></a></li>
            <!-- <li><a><div><i class="material-icons">group</i></div></a></li>  -->         
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
    .callbox{
        height: 100px;
        width: 100%;
        font-size: 24px;
        line-height: 100px;
    }
    .callbox>ul,.callbox>ul>li{
        display: inline-block;
    }

    .callbox>ul>li{
        width: 50px;
        height: 50px;
      
    }
   .callbox>ul>li:nth-child(2){
        margin-left: 25px;
    }
   .callbox>ul>li div{
        width: 50px;
        height: 50px;
        line-height: 50px;
        
         z-index: 2 !important;
        position: absolute;
        top: 24px;
    }
   .toolbox>ul>li a{
      color: #fff;
    }
   .callbox>ul>li:nth-child(2) div{
      background-color: #FE9900;
      color: #fff;
      border-radius: 50%;
     
    }
   .callbox>ul>li:nth-child(1) div{
      background-color: #164b77;
      color: #fff;
      border-radius: 50%;
      
    }
    .callbox>ul>li  .callboxbg{
      background-color: #999 !important;
      position:absolute;
      top: 24px;
      opacity: 0.8;
      border: 0 !important;
      z-index: 1 !important;
    }
    .callbox .material-icons{
        font-size: 34px;
        margin-top: 8px;
    }
</style>
