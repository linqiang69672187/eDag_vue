<template>
  <fab :actions="fabActions"
       @daiplate="daiplate"
       @av_timer="av_timer"
       @basestation="basestation"
       @lock="lock"
       @select_rangle="select_rangle"
       @elec_outer ="elec_outer"
       :main-tooltip="language.main_tooltip"	
     	
  ></fab>


</template>
<script>
import fab from 'vue-fab'

export default {
  components: {
    fab
  },
   data(){
      return {
          bgColor: '#778899',
          position: 'top-right',
          fabActions: [
              {
                  name: 'av_timer',
                  icon: 'av_timer',
                  color:'#164B77',
                  tooltip:'实时状况 (r)'
              },
              {
                  name: 'daiplate',
                  icon: 'dialpad',
                  tooltip:'拨号盘 (0-9)',
                  color:'#FE9900',
              },
              {
                  name: 'basestation',
                  icon: 'subject',
                  tooltip:'基站统计 (b)',
                   color:'#999999',
              }
              ,
              {
                  name: 'lock',
                  icon: 'screen_lock_landscape',
                  tooltip:'锁定跟踪 (l)',
                   color:'#cccccc',
              }, 
              {
                  name: 'select_rangle',
                  icon: 'select_all',
                  tooltip:'框选 (s)',
                  color:'#E54C3B',
              }
              , 
              {
                  name: 'elec_outer',
                  icon: 'border_outer',
                  tooltip:'实时电子栅栏 (e)',
                  color:'#8e44ad',
              }
          ],
          language:{
            main_tooltip:'点击展开'
          }
      }
  },
  methods:{
      daiplate(){
          this.$emit("daiplate");
          this.cleardom();
      },
      alert(){
      // @av_timer="av_timer"
      // @basestation="basestation"
      // @lock="lock"
      // @select_rangle="select_rangle"
      },
      av_timer(){
        window.vue_index.$refs.dmenu.changeshowtab('','realtime');
         this.cleardom();
      },
      basestation(){
        window.vue_index.$refs.dmenu.changeshowtab('','basestationchart');
         this.cleardom();
      },
      lock(){
        window.vue_index.$refs.dmenu.changeshowtab('','eyemaps');
         this.cleardom();
      },
      select_rangle(){
        let loadevent = LoadEvents("olBoxSelection");
         loadevent();//调用原来框选 
         this.cleardom();
      },
      elec_outer(){
        window.manageRealTimeUserInStockadeLayer();//调用--实时电子栅栏信息弹层开启关闭，外部全局方法
        this.cleardom();
      }
      ,
      cleardom(){
            try{
            if (window.navigator.userAgent.indexOf("MSIE")>=1){
            let dom =document.getElementsByClassName("tooltip");     
              for (let i = 0; i < dom.length-1; i++) {
                if(dom[i])
                dom[i].parentNode.removeChild(dom[i]);
              
              } 
            }
          }
          catch(e){}
      },
      setlanguage(){
          this.language.main_tooltip=GetTextByName("OpenCluster");
          this.fabActions.splice(0);
          this.fabActions.push(
            {
                  name: 'av_timer',
                  icon: 'av_timer',
                  color:'#164B77',
                  tooltip: GetTextByName("Lang_realTimeDisplay")+" (r)"
              },
              {
                  name: 'daiplate',
                  icon: 'dialpad',
                  tooltip:GetTextByName("Module1")+" (0-9)",
                   color:'#FE9900',
              },
              {
                  name: 'basestation',
                  icon: 'subject',
                  tooltip:GetTextByName("OperateLogIdentityDeviceType0")+" (b)",
                   color:'#999999',
              }
              ,
              {
                  name: 'lock',
                  icon: 'screen_lock_landscape',
                  tooltip: GetTextByName("Lang_lockingFunction")+" (l)",
                   color:'#cccccc',
              }, 
              {
                  name: 'select_rangle',
                  icon: 'select_all',
                  tooltip:GetTextByName("Selectionof")+" (s)",
                  color:'#E54C3B',
              }
              , 
              {
                  name: 'elec_outer',
                  icon: 'border_outer',
                  tooltip:GetTextByName("Lang_RealTimeFence")+" (e)",
                  color:'#8e44ad',
              }
          )
      },
      updateuseprameters(){
        if (useprameters.PrivateCallEnable=='0'){
          this.fabActions.splice(1,1);
        }
      }
  }
}
</script>

<style scoped>
#bottom-right-wrapper{
  bottom: 260px !important;
  right: 30px !important;
}

</style>
<style>
@media screen and(-ms-high-contrast:active),(-ms-high-contrast:none){
  .fab-wrapper .fab-main i{
    margin-top: -17px !important;
    margin-left: -17px !important;
  }
}
[aria-hidden=false]{
  display: none;
}

</style>