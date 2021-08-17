<template>
	<div class="container">
		<h2>Login</h2>
		<div class="inputs" >
			<TextInput
				v-model:value.lazy="usernameActual"
				label="Username"
				:maxLength="16"
				v-model:hasError="errors[0]"
			/>
			<TextInput
				v-model:value="passwordActual"
				label="Password"
				:obscureText="true"
				:validators="passwordValidators"
				:minLength="8"
				:maxLength="32"
				v-model:hasError="errors[1]"
			/>
		</div>
		<div class="buttons">
			<TextButton
				text="Login"
				@click="handleLogin"
				:disabled="disabled"
			/>
			<TextButton
				text="Register"
				:outline="true"
				@click="handleRegister"
				:disabled="disabled"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect, reactive } from "vue";
import TextButton from "../inputs/TextButton.vue";
import TextInput from "../inputs/TextInput.vue";

export default defineComponent({
	components: { TextInput, TextButton },
	props: {
		username: String,
		password: String,
	},
	emits: ["update:username", "update:password", "login", "register"],
	setup(props, { emit }) {
		const usernameActual = ref(props.username);
		const passwordActual = ref(props.password);

		const errors = reactive([false, false]);

		const disabled = computed(() => {
			const emptyField = !usernameActual.value || !passwordActual.value;

			return errors.reduce((prev, curr) => {
				return prev || curr;
			}, false) || emptyField;
		});

		const passwordValidators = [
			(value?: string) => {
				if (!value) return;
				if (value.length < 8) return "Must be 8 characters or more";
				let match = value.match(
					/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/
				);
				if (!match)
					return "Use one lowercase, one uppercase, one number, and one special";
			},
		];

		watchEffect(() => {
			emit("update:username", usernameActual.value);
		});

		watchEffect(() => {
			emit("update:password", passwordActual.value);
		});

		function handleLogin() {
			emit("login");
		}

		function handleRegister() {
			emit("register");
		}

		return {
			usernameActual,
			passwordActual,
			passwordValidators,
			handleLogin,
			handleRegister,
			errors,
			disabled,
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