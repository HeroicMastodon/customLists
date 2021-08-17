<template>
	<button :disabled="disabled" :class="outline ? 'outline' : ''">
		{{ text || "Button" }}
	</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		text: String,
		outline: {
			type: Boolean,
			required: false,
			default: false,
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
});
</script>

<style lang="scss" scoped>
button {
	border: none;
	padding: 0.5rem 1rem;
	font-weight: 600;
	border-radius: 4px;
	background: $primary;
	color: $dark;
	font-size: 1.25rem;

	&:focus {
		outline: none;
		$darker: darken($primary, 25);

		background: $darker;

		&.outline {
			border: 2px solid $darker;
			background: transparent;
			color: $darker;
			font-weight: 500;
		}
	}

	&.outline {
		border: 2px solid $primary;
		background: transparent;
		color: $primary;
		font-weight: 500;
	}

	&:hover {
		cursor: pointer;
	}

	&:disabled {
		cursor: not-allowed;
	}
}
</style>
