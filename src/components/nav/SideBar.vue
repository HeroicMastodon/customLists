<script lang="ts" setup>
import { List } from "@/models/list";
import { useRouter } from "vue-router";

const props = defineProps<{
  open: boolean;
  items: {name: string; path: string;}[];
}>();

// TODO: Make this sidebar look good

const router = useRouter();
async function navToItem(path:string) {
  await router.push(path);
}
</script>

<template>
  <div :class="`side-bar ${open ? 'open' : ''}`">
    <div v-for="(item) in items" :key="item.path" class="item" @click="navToItem(item.path)">
      {{ item.name }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.side-bar {
  width: 0;
  overflow: hidden;
  background-color: $dark;
  height: calc(100vh - 3rem);

  &.open {
    width: fit-content;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .item {

    }
  }

}

</style>