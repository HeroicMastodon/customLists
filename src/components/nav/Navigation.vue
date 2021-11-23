<script lang="ts" setup>
import { userService, useUsers } from "@/services/userService";
import { computed, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

const props = withDefaults(defineProps<{
  title?: string;
  isLoggedIn?: boolean;
  sidebarOpen?: boolean;
}>(), {
  title: 'Custom Lists',
  isLoggedIn: false
});

const emit = defineEmits<{
  (e: 'update:sidebarOpen', value: boolean): void;
  (e: 'logout'): void;
  (e: 'hard-logout'): void;
  (e: 'toggleSidebar'): void;
}>();

const router = useRouter();


watchEffect(() => {
  if (!props.isLoggedIn) router.push('/login');
})

async function logout() {
  emit('logout');
}

async function hardLogout() {
  emit('hard-logout');
}

function toggleSidebar() {
  console.log('toggling')
  emit('toggleSidebar');
}

async function goHome() {
  await router.push('/');
}

</script>

<template>
  <nav class="top-nav">
    <button class="light" @click="toggleSidebar">{{ sidebarOpen ? 'close' : 'open' }}</button>
    <h1>
      {{ title }}
    </h1>
    <template v-if="isLoggedIn">
      <button @click="goHome" class="light">Home</button>
      <button @click="logout" class="light">Logout</button>
    </template>
  </nav>
</template>

<style lang="scss" scoped>
.top-nav {
  position: sticky;
  top: 0;

  display: flex;

  background: $primary;

  h1 {
    margin: 0;
    padding: .5rem;
    text-align: left;
  }
}
</style>