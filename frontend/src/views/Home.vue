<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import VueSkeletonLoader from 'skeleton-loader-vue';
export default {
  name: 'Home',
  components: {
    HelloWorld,
    VueSkeletonLoader
  },
  data () {
    return {
      items: null
    }
  },
  async mounted () {
   let data = await this.$store.getters.getGrpc.getFiles()
   console.log("dddddddd "+JSON.stringify(data.array[0]))

  
  }

}
</script>
