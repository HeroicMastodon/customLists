<script lang="ts" setup>
import { Field, Item, ItemDefinition } from "@/models/list";
import { reactive, watchEffect } from "vue";
import SelectInput from "@/components/inputs/SelectInput.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import Checkbox from "@/components/inputs/Checkbox.vue";

const props = defineProps<{
  value: Item;
  definition: ItemDefinition;
}>();

const emit = defineEmits<{
  (e: 'update:value', value: Item): void;
}>();

const item = reactive(props.value);

watchEffect(() => {
  emit("update:value", item);
})

watchEffect(() => {
  item.fields = props.value.fields;
})

function handleCheck(field: Field, checked: boolean) {
  field.itemValue = checked ? 'true' : 'false'
}

function generateOptionsArray(options: string) {
  const arr = options.split(',');
  return arr.reduce<string[]>((newArr, item) => {
    newArr.push(item.trimEnd())
    return newArr;
  }, [])
}
</script>

<template>
  <h3>
    Item
  </h3>
  <div class="container">

    <template v-for="(field, index) in item.fields" :key="index">
      <template v-if="field.itemType === 'select'">
        <div class="field-group">
          <label class="label" :for="definition[index].name">
            {{ definition[index].name }}
          </label>
          <SelectInput :name="definition[index].name" :options="generateOptionsArray(definition[index].options)"
                       v-model:value="field.itemValue"
          />
        </div>
      </template>
      <template v-else-if="field.itemType === 'text'">
        <TextInput class="field-group" v-model:value="field.itemValue" :label="definition[index].name"/>
      </template>
      <template v-else-if="field.itemType === 'text area'">
        <div class="field-group">
          <label :for="definition[index.name]">{{ definition[index].name }}</label>
          <textarea v-model="field.itemValue"></textarea>
        </div>
      </template>
      <div v-else-if="field.itemType === 'radio'">
      </div>
      <div v-else-if="field.itemType === 'number'">
        <TextInput class="field-group" v-model:value="field.itemValue" :label="definition[index].name" type="number"/>
      </div>
      <div v-else-if="field.itemType === 'date'">
        <TextInput class="field-group" v-model:value="field.itemValue" :label="definition[index].name" type="date"/>
      </div>
      <div v-else-if="field.itemType === 'time'">
        <TextInput class="field-group" v-model:value="field.itemValue" :label="definition[index].name"
                   type="datetime-local"
        />
      </div>
      <template v-else-if="field.itemType === 'check box'">
        <div class="field-group">
          <Checkbox :value="field.itemValue === 'true'" :label="definition[index].name"
                    @update:value="val => handleCheck(field, val)"
          />
        </div>
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.field-group {
  width: 320px;
  display: flex;
  flex: 1;
}

.label {
  margin-right: 1rem;
}

textarea {
  background: $dark;
  margin-left: 1rem;
  color: $text-light;

  &:focus, &:focus-within {
    outline: solid $primary 1px;
  }
}
</style>