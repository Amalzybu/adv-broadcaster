<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  data () {
    return {
      items: null
    }
  },
  async mounted () {
   let data = await this.$store.getters.getGrpc.getFiles()
  
  }

}
</script>
