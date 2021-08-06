<template>
  <div class="list-form">
    <TextInput v-model:value="name" label="Name"/>
    <div class="field">
      <TextInput v-model:value="name" label="Field Name"/>
      <SelectInput :options="fieldTypeOptions" v-model:value="fieldName"/>
    </div>
    <h2>{{fieldName}}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TextInput from '@/components/inputs/TextInput.vue';
import SelectInput from './inputs/SelectInput.vue';
import { FieldTypeOptions } from '@/models/list';

export default defineComponent({
  name: 'ListForm',
  components: {
    TextInput,
    SelectInput
  },
  props: {
  },
  setup() {
    const name = ref('');
    const fieldTypeOptions = FieldTypeOptions;
    const fieldName = ref('');

    return {
      name,
      fieldTypeOptions,
      fieldName
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-form {
  .field {
    display: flex;
  }
}
</style>
