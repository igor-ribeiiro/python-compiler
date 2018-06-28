<template>
  <div id="app">
    <editor/>
  </div>
</template>

<script>
import Editor from "./components/Editor.vue";

export default {
  name: 'app',
  data() {
    return {
      identification: "00000"
    }
  },
  components: {
    Editor
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
