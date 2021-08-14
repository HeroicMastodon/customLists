<template>
	<div class="container">
		<h2>Login</h2>
		<div class="inputs">
			<TextInput v-model:value.lazy="username" label="Username" />
			<TextInput
				v-model:value="password"
				label="Password"
				:obscureText="true"
				:validators="passwordValidators"
			/>
		</div>
		<div class="buttons">
			<TextButton text="Login" />
			<TextButton text="Register" :outline="true" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TextButton from "../inputs/TextButton.vue";
import TextInput from "../inputs/TextInput.vue";

export default defineComponent({
	components: { TextInput, TextButton },
	setup() {
		const username = ref("");
		const password = ref("");

		const passwordValidators = [
			(value?: string) => {
				if (!value) return;
				if (value.length < 8) return "Must be 8 characters or more";
				let match = value.match(
					/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/
				);
				if (!match)
					return "Must include one lowercase, one uppercase, one number, and one special";
			},
		];

		return {
			username,
			password,
			passwordValidators,
		};
	},
});
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;

	h2 {
		align-self: flex-start;
	}

	.inputs {
		width: calc(100% - 4rem);
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		width: calc(100% - 4rem);

		padding-top: 2rem;
	}
}
</style>