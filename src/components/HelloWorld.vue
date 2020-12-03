<template>
  <div class="hello">
    {{msg}}
     <slot></slot>
  </div>
</template>

<script>
import store from '@/vuex/store'
import INCREASE from '@/vuex/modul_types'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: store.getters.get_points
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
