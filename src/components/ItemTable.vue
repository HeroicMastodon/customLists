<script lang="ts" setup>
import { Item, ItemDefinition } from "@/models/list";

const props = defineProps<{
  items: Item[];
  definition: ItemDefinition;
}>();

const emit = defineEmits<{
  (e: 'edit', item: Item): void;
  (e: 'delete', item: Item): void;
}>();


</script>

<template>
  <table>
    <tr>
      <th v-for="field in definition" :key="field.position">
        {{ field.name }}
      </th>
      <th>
        Actions
      </th>
    </tr>
    <tr v-for="item in items" :key="item.id" @click="emit('edit', item)">
      <td v-for="field in item.fields" :key="field.position">
        {{ field.value }}
      </td>
      <td>
        <button @click.stop="emit('delete', item)">Delete</button>
      </td>
    </tr>
  </table>
</template>

<style lang="scss" scoped>

</style>