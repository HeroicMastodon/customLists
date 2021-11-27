<script lang="ts" setup>
const props = defineProps<{
  open: boolean;
  items: string[];
}>();

// TODO: Make this sidebar look good
</script>

<template>
  <div :class="`side-bar ${open ? 'open' : ''}`">
    {{ items }}
  </div>
</template>

<style lang="scss" scoped>
.side-bar {
  width: 0;
  overflow: hidden;

  &.open {
    width: fit-content;
  }
}

</style>