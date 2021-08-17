<template>
	<div class="list">Logged in as {{ user.username }}!</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { userService, useUsers } from "@/services/userService";

export default defineComponent({
	setup() {
		const user = useUsers();

		return {
			user,
		};
	},
});
</script>

<style lang="scss" scoped>
.list {
}
</style>