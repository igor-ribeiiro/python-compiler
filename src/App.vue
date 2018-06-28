<template>
  <div id="app">
    <title>
        Python Compiler
    </title>
    <link rel="stylesheet" type ="text/css" href="css/style.css">
    <link rel="shortcut icon" type="image/png" href="img/python_icon.ico"/>
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
