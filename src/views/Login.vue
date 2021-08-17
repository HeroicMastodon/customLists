<template>
	<div class="wrapper">
		<div class="login-page">
			<LoginForm
				v-model:username="username"
				v-model:password="password"
				@login="login"
				@register="register"
			/>
		</div>

		<div v-if="error" class="error">
			{{error}}
		</div>
	</div>
</template>

<script lang="ts">
import LoginForm from "@/components/Forms/LoginForm.vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { LoginResponse, userService } from "@/services/userService";

export default defineComponent({
	components: { LoginForm },
	setup(props) {
		const router = useRouter();
		const username = ref("");
		const password = ref("");
		const error = ref("");

		async function login() {
			const result = await userService.login(username.value, password.value);
			handleLoginResponse(result);
		}

		async function register() {
			const result = await userService.register(username.value, password.value);
			handleLoginResponse(result);
		}

		function handleLoginResponse(result: LoginResponse) {
			if (result.success) {
				router.push('/lists')
				return;
			}

			error.value = result.error ?? "";
		}

		return {
			username,
			password,
			login,
			register,
			error
		};
	},
});
</script>

<style lang="scss" scoped>
.wrapper {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 2rem;

	.login-page {
		background: $dark;
		width: 320px;
		padding: 1rem 1rem 2rem 1rem;
		border-radius: 16px;
	}

	.error {
		color: $error;
	}
}
</style>