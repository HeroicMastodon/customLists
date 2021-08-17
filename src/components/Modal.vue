<template>
		<transition v-show="open" name="modal">
			<div class="modal-mask" @click.self="close()" @keyup.esc="close()">
				<div class="modal-wrapper">
					<div class="modal-container">
						<slot></slot>
					</div>
				</div>
			</div>
		</transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		open: {
			type: Boolean,
			required: true
		},
	},
	emits: [
		'close'
	],
	setup(props, {emit}) {
		function close() {
			emit('close');
		}

		return {
			close,
		};
	},
	methods: {
		test() {
			console.log("test");
		}
	}
});
</script>

<style lang="scss" scoped>
.modal-mask {
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	transition: opacity 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
}

.modal-container {
	width: 700px;
	max-width: 90vw;
	margin: 0px auto;
	padding: 1em;
	background-color: $black;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	font-family: Helvetica, Arial, sans-serif;
	max-height: 90vh;
	min-height: 10vh;
	// overflow-y: auto;
}

.modal-wrapper {
	max-height: 90vh;
	// min-height: 10vh;
	// overflow-y: auto;
}

.modal-header h1 {
	margin-bottom: 30px;
	font-size: 1.5em;
}

.modal-body {
	margin: 0;
}

.modal-body input {
	margin-bottom: 20px;
	height: 30px;
}

.modal-footer {
	margin-top: 20px;
	display: flex;
	justify-content: space-between;
}

.modal-default-button {
	float: right;
}

.modal-enter-active {
	opacity: 0;
}

.modal-enter-to {
	opacity: 1;
}

.modal-leave-active {
	opacity: 1;
}

.modal-leave-to {
	opacity: 0;
}

@media only screen and (max-width: 600px) {
	$modalHeight: 100%;
	.modal-mask {
		transition-duration: 0.3s;
	}

	.modal-wrapper {
		position: absolute;
		bottom: 0;
		box-sizing: border-box;
		width: 100%;
	}

	.modal-container {
		transition: transform 0.3s ease;
		overflow-y: auto;
		opacity: 1;
		width: 100%;
		max-width: unset;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		padding-bottom: 0;
	}

	.modal-enter-active {
		.modal-container {
			transform: translateY($modalHeight);
		}
	}

	.modal-enter-to {
		.modal-container {
			transform: translateY(0%);
		}
	}

	.modal-leave-to {
		.modal-container {
			transform: translateY($modalHeight);
		}
	}
}
</style>
