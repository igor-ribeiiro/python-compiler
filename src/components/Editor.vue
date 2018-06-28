<template>
  <div id="editor">
    <div id="container">
        <div id= "scriptName">
            <b-button id = "buttonChangeName" :size = "'sm'" :variant= "'primary'">
                change
            </b-button>
            <input v-model="nameText" is="textarea" id = "nameArea" readonly = true/>
        </div>
      <div id ="editor">
        <b-button id = "buttonSave" :size = "'sm'" :variant= "'primary'">
            Save
        </b-button>
        <b-button id = "buttonRun" :size = "'sm'" :variant= "'primary'">
                run
        </b-button>
        <editor id = "aceEditor" v-model="code" @init="editorInit" lang="python" theme="chrome" width="1000" height="400" fontSize = "50"></editor>
      </div>
    </div>
    
    <div id = "outputArea">
      <input v-model="outputText" is="textarea" id = "outputArea" readonly = true/>
    </div>
    <div id = "inputArea">
      <input v-model="inputText" is="textarea" id = "inputArea"/>
      <b-button :size = "'sm'" :variant= "'primary'">
                enter
      </b-button>
    </div>
    
    
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      code:'',
      inputText:'',
      outputText:'',
      nameText: ''
    }
  },
  components: {
        editor: require('vue2-ace-editor')
        
    },
  methods: {
      editorInit: function () {
          require('brace/ext/language_tools') //language extension prerequsite...
          require('brace/mode/html')                
          require('brace/mode/python')    //language
          require('brace/mode/less')
          require('brace/theme/chrome')
          require('brace/snippets/python') //snippet
        }
    }    
}
</script>
<style>
/*#aceEditor{
  fontSize: 50
}*/
#editor {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#nameArea{
    resize: none;
}
#inputArea{
  resize: none;
  left: 100px;
}
#outputArea{
  resize: none;
}
#buttonRun{
  margin-left: -98%;
}
#buttonSave{
  margin-left: 0%;
}

</style>
