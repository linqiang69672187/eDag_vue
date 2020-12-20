<template>
    <div>
        <ul font-size="0">
            <li><div :style="{backgroundColor:colors.kuanxuang}" ><Icon  :color="colors.label"  size="20" type="ios-grid" /></div></li>
            <li><div :style="{backgroundColor:colors.quanxuang}"><Icon  :color="colors.label"  size="20" type="ios-contacts" /></div></li>  
            <li><div :style="{backgroundColor:colors.jingyin}"><Icon  :color="colors.label"  size="20" type="ios-notifications-off" /></div></li>  
            <li><div :style="{backgroundColor:colors.dituhuifu}"><Icon  :color="colors.label" size="20" type="md-globe" /></div></li>  
            <li><div :style="{backgroundColor:colors.renyuan}"><Icon  :color="colors.label"  size="20" type="ios-hammer" /></div></li>  
        </ul>
    </div>
</template>
<script>
import { Icon} from 'iview';
export default {
    data () {
        return {
                shwophonebg: false,
                colors:{
                    label:'#fff',
                    kuanxuang:'#164B77',
                    quanxuang:'#FE9900',
                    jingyin:'#999999',
                    dituhuifu:'#cccccc',
                    renyuan:'#E54C3B',
                }
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
      list-style: none;
      margin: 0;
     
       display: inline;
   }
   ul div{
        width: 30px;
        height: 30px;
        line-height: 30px;
       margin: 0;
        
   }
</style>
<style>
 
</style>