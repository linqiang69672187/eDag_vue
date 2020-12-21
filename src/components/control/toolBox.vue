<template>
    <div>
        <ul font-size="0">
               <Tooltip :content="language.kuangxuan"  placement="top"><li @mouseleave="outthis('kuanxuangselected')" @click="clickthis('kuanxuangselected')"><div :class="{kuanxuangselected}"  :style="{backgroundColor:colors.kuanxuang}" ><Icon  :color="colors.label"  size="20" type="ios-grid" /></div></li></Tooltip><!--
　　　　　　　--><Tooltip :content="language.quanxuang"  placement="top"><li @mouseleave="outthis('quanxuangselected')" @click="clickthis('quanxuangselected')"><div :class="{quanxuangselected}"   :style="{backgroundColor:colors.quanxuang}"><Icon  :color="colors.label"  size="20" type="ios-contacts" /></div></li></Tooltip><!--  
            --><Tooltip content='框选'  placement="top"><li @mouseleave="outthis('jingyinselected')" @click="clickthis('jingyinselected')"><div :class="{jingyinselected}"  :style="{backgroundColor:colors.jingyin}"><Icon  :color="colors.label"  size="20" type="ios-notifications-off" /></div></li></Tooltip><!--  
            --><Tooltip content='框选'  placement="top"><li @mouseleave="outthis('dituhuifuselected')" @click="clickthis('dituhuifuselected')" ><div :class="{dituhuifuselected}" :style="{backgroundColor:colors.dituhuifu}"><Icon  :color="colors.label" size="20" type="md-globe" /></div></li></Tooltip><!--  
            --><Tooltip content='框选'  placement="top"><li @mouseleave="outthis('renyuanselected')" @click="clickthis('renyuanselected')"><div :class="{renyuanselected}"  :style="{backgroundColor:colors.renyuan}"><Icon  :color="colors.label"  size="20" type="ios-hammer" /></div></li></Tooltip>  
        </ul>
    </div>
</template>
<script>
import { Icon,Tooltip } from 'iview';
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
                },
                language:{
                    kuangxuan:'框选',
                    quanxuang:'圈选呼叫'
                },
                kuanxuangselected:false,
                quanxuangselected:false,
                jingyinselected:false,
                dituhuifuselected:false,
                renyuanselected:false,
            }
        },
    mounted(){
        
    },
    methods:{
        clickthis(type){
            this.kuanxuangselected=this.quanxuangselected=this.jingyinselected=this.dituhuifuselected=this.renyuanselected=false;
            switch (type) {
                case 'kuanxuangselected':
                    this.kuanxuangselected=true;
                 break;
                case 'quanxuangselected':
                    this.quanxuangselected=true;
                 break;
                case 'jingyinselected':
                    this.jingyinselected=true;
                 break;
                 case 'dituhuifuselected':
                    this.dituhuifuselected=true;
                 break;
                 case 'renyuanselected':
                    this.renyuanselected=true;
                 break;
                default:
                    break;
            }
        },
         outthis(type){
           switch (type) {
                case 'kuanxuangselected':
                    this.kuanxuangselected=false;
                 break;
                case 'quanxuangselected':
                    this.quanxuangselected=false;
                 break;
                case 'jingyinselected':
                    this.jingyinselected=false;
                 break;
                 case 'dituhuifuselected':
                    this.dituhuifuselected=false;
                 break;
                 case 'renyuanselected':
                    this.renyuanselected=false;
                 break;
                default:
                    break;
            }
        }
        
    }

}
</script>
<style scoped>
  
    ul{
    display:inline;
    white-space: nowrap;
    vertical-align:bottom;
    
       margin:0;padding:0;
      
    }
   ul li{
      list-style: none;
  
       margin:0;padding:0;
       vertical-align:bottom;
       display: inline-block;
     
   }
  
   ul div{
        width: 30px;
        height: 30px;
        line-height: 30px;
        margin: 0;
         
   }
    div{
         transition:all 0.6s;
    -moz-transition:all 0.6s; /* Firefox 4 */
    -webkit-transition:all 0.6s; /* Safari and Chrome */
     -o-transition:all 0.6s; /* Opera */
  }
  .kuanxuangselected,.quanxuangselected,.jingyinselected,.dituhuifuselected,.renyuanselected{
      height: 40px;
      line-height: 40px;
  }
</style>
<style>
 
</style>