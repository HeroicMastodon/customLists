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
  <div class="container">
    <div class="card">
      {{ items }}
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>