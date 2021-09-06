<script lang="ts" setup>
import { useUsers } from "@/services/userService";
import { computed } from "vue";

	const user = useUsers();

	const isLoggedIn = computed(() => {
		return !!user.username;
	});

	function logout() {
		console.log('logout');
	}

</script>

<template>
	<div>
		<button v-if="isLoggedIn" @click="logout()">Logout</button>
		<button @click="logout()">Logout</button>
	</div>
</template>

<style lang="scss" scoped>
</style>