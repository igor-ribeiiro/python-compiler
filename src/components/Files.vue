<template>
    <div class="row">
        <template v-for="pasta in ['primary','secondary','success','outline-success','warning','danger','link']">
            <div class="col-md-4 pb-2" v-for="size in ['sm','','lg']" :key="`${pasta}_${size}`">
                <b-button :size="size" :variant="variant">
                    {{pasta}} {{size}}
                </b-button>
            </div>
        </template>
    </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      pastas:'',
      scripts:''
    }
  }    
}
</script>
<style>

</style>
