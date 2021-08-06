<template>
  <div class="home">
    <HelloWorld msg="hi"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/ListForm.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup(props, {}) {
    
  }
});
</script>
