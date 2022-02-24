<template>
   <a href=""><img v-bind:src="content" alt="">{{title}}</a>
</template>
<script>
export default {
  props: ["details"],
  methods: {
    // addToCart() {
    //   this.$store.commit("addToCart", this.product);
    // },
  },
  computed: {
    title() {
      return this.details[1];
    },
    content() {
      return this.details[2];
    },
    
  },
};
</script>

