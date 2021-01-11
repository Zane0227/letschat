<template>
  <div class="home">
    <Load v-if="!ifload" @usrload="usrload"/>
    <HelloWorld v-if="ifload" :usrname="usrname"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Load from '../components/Load'
export default {
  name: 'Home',
  data(){
    return{
      ifload:false,
      usrname:''
    }
  },
  components: {
    HelloWorld,
    Load
  },
  methods:{
    usrload(msg){
      this.ifload = true
      this.usrname = msg
    }
  }
}
</script>
