<template>
  <div >
      <input v-model="input" />
  <keyboard
  v-model="input"
  @custom="custom"
  @input="changed"
  :layouts="[
    '1234567890{delete:backspace}|qwertyuiop|asdfghjkl|{shift:goto:1}zxcvbnm',
    '!@#$%^&*(){delete:backspace}|QWERTYUIOP|ASDFGHJKL|{shift:goto:0}ZXCVBNM'
  ]"
  :maxlength="16"
></keyboard>  
  </div>
</template>

<script>
import keyboard from 'vue-keyboard';


export default {
 
  components: {
    keyboard 
  },

 data () {
            return {
                    input: "",
                   
            }
        },
  methods: {
    changed(value) {
           console.log('Value ' + value);
           var e=document.createEvent("KeyboardEvents");
           e.initKeyboardEvent("keydown",true,true,window,"U+0014"); // tab    
    },
    custom(keyboard) {
      console.log(keyboard.value);
    }
  }
};
</script>

<style>

</style>
