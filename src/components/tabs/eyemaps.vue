<template>
    <div :style="backgroundDiv"  class="row">
        <ul>
            <li  v-for="item in lockitems" :key="item.issi"> 
                <Map :lockdevice="item" ></Map>
            </li>
            
        </ul>
    </div>
</template>
<script>
import Map from "@/components/control/eDagMap"

export default {
    data(){
        return{
                lockitems:[],//锁定的设备
                backgroundDiv: {
                    backgroundImage: 'url(' + require('@/assets/images/tabs_table_bg2.png') + ')'
                },
                
        }
    },
    mounted(){
        this.updatelockitems();
    },
    methods:{  
            updatelockitems(){
                this.lockitems=useprameters.lockids;
            }
        },
    components: {Map},
    }
</script>
<style scoped>
.row{
    width: 100%; 
    height:220px;
    background:no-repeat no-repeat;;
    background-size: 100%;  
    background-color: #fff;
    overflow-x: auto;
    overflow-y: hidden;
}

.row>ul,.row>ul>li{

    height:220px;
    display: inline-block;
    white-space: nowrap; 
    margin-right: 5px;
}
li>div{
    height: 220px;
}

</style>
<style >
.vjs-big-play-button{
    top:85px !important;
    left: 150px !important;
}
</style>