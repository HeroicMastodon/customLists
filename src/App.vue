<template>
  <Navigation :sidebar-open="sidebarOpen"  @logout="logout" :is-logged-in="isLoggedIn" @toggleSidebar="sidebarOpen = !sidebarOpen" />
  <div class="app-container">
    <side-bar :open="sidebarOpen" :items="listNames"></side-bar>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navigation from '@/components/nav/Navigation.vue'
import { computed, reactive, ref } from "vue";
import SideBar from "@/components/nav/SideBar.vue";
import { userService, useUsers } from "@/services/userService";
import { useRouter } from "vue-router";
import { listService } from "@/services/listService";
const sidebarOpen = ref(false);
const isLoggedIn = ref(userService.isLoggedIn);
const router = useRouter();


async function logout() {
  console.log('logging out')
  const result = await userService.logout();
  if (!result) return;

  await router.push('/login');
}


const lists = ref(listService.getLists());

const listNames = computed(() => lists.value.lists.reduce<string[]>((ret, item) => {
  ret.push(item.name);
  return ret;
}, []))
</script>

<style lang="scss">
body {
  background: $darkest;
  margin: 0;
  min-width: 320px;
  overflow: auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-light;
  height: 100%;
}

.app-container {
  display: flex;

  .content {
    display: initial;
    width: 100%;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
