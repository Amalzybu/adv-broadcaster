<template>
  <div class="about">
     <MovieBox/>
  </div>
</template>

<script>
import MovieBox from '@/components/HelloWorld.vue'


export default {
  name: 'Home',
  components: {
    MovieBox,
  },
  data () {
    return {
      items: null
    }
  },
  async mounted () {
   let data = await this.$store.getters.getGrpc.getFiles()
   console.log("dddddddd "+JSON.stringify(data.array))

  
  }

}
</script>

