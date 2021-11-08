<template>
	<div class="list">Logged in as {{ user.username }}!</div>
	<ListForm :value="list" />
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import { userService, useUsers } from "@/services/userService";
import ListForm from "@/components/Forms/ListForm.vue";
import { List } from "@/models/list";

	const user = useUsers();

	const list: List = {
		name: '',
		itemDefinition: []
	}

</script>

<style lang="scss" scoped>
.list {
}
</style>