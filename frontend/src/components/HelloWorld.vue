<template>
     <div class="main-container" >
      <div class="location" id="home">
          <h1 id="home">video queue</h1>
          <div class="box">
            <MovieBox
             v-for="box in items"
            :key="box['id']"
            :details="box"
            />
          </div>
      </div>
      

     
    <!-- END OF MAIN CONTAINER -->

    <!-- LINKS -->
   
    </div>
</template>

<script>
import MovieBox from '@/components/MovieBox.vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      items: null,
      
    };
  },
  async mounted() {
      let data = await this.$store.getters.getGrpc.getFiles()
      this.items =data.array[0]
  },
  components: {
    MovieBox,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
