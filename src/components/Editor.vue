<template>
  <div id="editor">
    <nav class="blue blue-darken-3">
      <div class="nav-wrapper">
        <a href="" class="brand-logo" style="margin-left: 16px;">
           PyBin
        </a>
      </div>
    </nav>

    <tutorial/>

    <div class="session">
      <div class="tool row">
        <div class="col s4">
          <div class="input-field">
            <input type="text" class="validate" id="session" v-model="sessionId">
            <label for="session">Session</label>
          </div>
        </div>

        <div class="col s4 offset-s1">
          <div class="status valign-wrapper">
            <h6>Current status: {{ status }}</h6>
          </div>
        </div>

        <div class="col s2 offset-s1 l-buttons">
          <a class="left btn-large btn-flat waves-effect waves-purple" @click="showTutorial">Help</a>
          <a class="right btn-large waves-effect waves-light deep-purple" @click="sendCode">Run!</a>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s6">
        <editor id="pythonEditor" v-model="code"
                @init="editorInit" lang="python" theme="chrome"
                height="600px" :options="options"/>
      </div>
      <div class="col s6">
        <editor id="output" v-model="output"
                @init="outputInit" lang="text" theme="chrome"
                height="600px" :options="options"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Tutorial from "./Tutorial.vue";

  export default {
    name: 'app',
    data() {
      return {
        code: '# Place your code here\nprint("Hello World!")',
        output: "Your output text goes here",
        sessionId: '',
        options: {
          fontSize: "12pt",
          width: .5 * window.width,
        },
        status: "waiting"
      }
    },
    components: {
      editor: require('vue2-ace-editor'),
      Tutorial
    },
    methods: {
      editorInit() {
        require('brace/ext/language_tools'); //language extension prerequsite...
        require('brace/mode/python');    //language
        require('brace/theme/chrome');
        require('brace/snippets/python'); //snippet
      },
      outputInit() {
        require('brace/ext/language_tools'); //language extension prerequsite...
        require('brace/mode/text');    //language
        require('brace/theme/chrome');
      },
      async sendCode() {
        await fetch("/code", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ "username": this.sessionId, "code": this.code })
        });

        setTimeout(() => this.fetchOutput(), 1000);
      },
      async fetchOutput() {
        const body = await (await fetch("/status", {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ "username": this.sessionId })
        })).json();

        this.output = body.output;
        this.status = body.status;

        setTimeout(() => this.fetchOutput(), 200);
      },
      showTutorial() {
        this.$modal.show("tutorial");
      }
    }
  }
</script>
<style>
  .session {
    margin-top: 32px;
  }

  .btn-flat:hover {
    background-color: rgba(103, 58, 183, 0.7);
  }

  .tool {
    margin: 8px 32px;
  }
  .left {
    margin-right: 8px;
  }

  .right {
    margin-left: 8px;
  }

  .status, l-buttons {
    height: 84px;
  }
</style>
