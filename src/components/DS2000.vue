<template>

  <div class="ds2000"  :style="backgroundDiv"> <div class="changewindows"><router-link tag="a"  :to="{name:'index'}" ><i class="fas fa-exchange-alt"></i></router-link></div> </div>
 

</template>
<script>


export default {
  components: {

  },
   data(){
      return {
        backgroundDiv: {
            backgroundImage: 'url(' + require('@/assets/images/Ds2000.png') + ')'
        }
    }
  },
  methods:{
      cache(){
      },
      alert(){
      }
  }
}
</script>

<style scoped>
    .ds2000{
         height: 100%;
         width: 100%;
         background:no-repeat no-repeat;;
         background-size: 100%;  
    }
 .changewindows{
  position: absolute;
  top: 0;
  right: 5px;
  width:22px;
  height: 20px;
  font-size: 16px;
  line-height: 20px;
  border: 1px solid #fff;
  cursor: pointer;
  background-color: #fff;
  cursor: pointer;
}

</style>
<style>

</style>