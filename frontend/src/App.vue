<template>
  <div class="wrapper" id="nav">
  <header>
        <div class="netflixLogo">
          <a id="logo" href="#home"><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/logo.PNG?raw=true" alt="Logo Image"></a>
        </div>      
        <nav class="main-nav">                
        <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>    
        </nav>
        <nav class="sub-nav">
          <a href="#"><i class="fas fa-search sub-nav-logo"></i></a>
          <a href="#"><i class="fas fa-bell sub-nav-logo"></i></a>
          <a href="#">Account</a>        
        </nav>      
      </header>
  </div>

  <router-view/>
</template>
<script>
import "@/assets/common.css";
 export default{
  mounted(){
      this.$store.commit('instantiateConnection')
  },  
 }
</script>

