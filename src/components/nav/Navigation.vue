<script lang="ts" setup>
import { userService, useUsers } from "@/services/userService";
import { computed } from "vue";
import { useRouter } from "vue-router";

	const user = useUsers();

	const isLoggedIn = computed(() => {
		return !!user.username;
	});

	const router = useRouter();

	async function logout() {
		const result = await userService.logout();
		if (result) router.replace('/');
	}

	async function hardLogout() {
		const result = await userService.hardLogout();
		if (result) router.replace('/');
	}

</script>

<template>
	<div v-if="isLoggedIn">
		<button v-if="isLoggedIn" @click="logout()">Logout</button>
		<button v-if="isLoggedIn" @click="hardLogout()">Hard Logout</button>
	</div>
</template>

<style lang="scss" scoped>
button {
	margin: 1rem;
}
</style>