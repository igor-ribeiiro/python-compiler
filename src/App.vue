<template>
  <div id="app">
    <nav>
      <div id = "identification">
        <h6>{{identification}}</h6>
      </div>
      <p><router-link to="/">Home</router-link> &nbsp;
      <router-link to ="/about">About</router-link>&nbsp;
      <router-link to ="/drive">Drive</router-link>&nbsp;
      <router-link to ="/editor">Editor</router-link></p>
    </nav>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return{
      identification:"00000"
    }
  }  
}
</script>
<style>
/*#aceEditor{
  fontSize: 50
}*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#identification{
  margin-top: 60px;
}

</style>
