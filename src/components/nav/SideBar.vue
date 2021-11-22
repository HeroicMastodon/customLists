<script lang="ts" setup>
const props = defineProps<{
  open: boolean
}>();
</script>

<template>
  <div :class="`side-bar ${open ? 'open' : ''}`">
    side bar
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