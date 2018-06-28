<template>
  <modal name="tutorial" adaptive>
    <div class="content">
      <h4>PyBin: Remotely executes your Python code</h4>
      <p>How to use PyBin:</p>
      <ul>
        <li>
          <p>- Fill the session input with a text, this is your id and can be used to retrieve the output in another day.</p>
        </li>
        <li>
          <p>- Next, put your code in the left editor.</p>
        </li>
        <li>
          <p>- Then, click in the "Run" button.</p>
        </li>
      </ul>
    </div>
  </modal>
</template>

<script>
  export default {
    name: "Tutorial"
  }
</script>

<style scoped>
.content {
  margin: 0 16px;
}
</style>