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
table {
  width: 100%;
  background-color: $dark;
  text-align: center;
  padding: 1rem;
  border-radius: 5px;
  border-collapse: collapse;

  tr {
    $border: solid $text-light 2px;

    th, td {
      padding: 1rem;
      box-sizing: border-box;
      border: $border;
      resize: horizontal;
      overflow: auto;
      &:first-child {
        text-align: left;
        border-left: none;
      }

      &:last-child {
        text-align: right;
        border-right: none;
      }

      &:only-child {
        text-align: center;
        border: none;
      }
    }

    th {

    }

    td {

    }

    &:last-child {
      th, td {
        border-bottom: none;
      }
    }

    &:only-child {
      th, td {
        border-bottom: none;
        border-top: none;
      }
    }

    &:first-child {
      th, td {
        border-top: none;
      }
    }
  }
}
</style>