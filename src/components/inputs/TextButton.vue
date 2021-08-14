<template>
	<button :class="outline ? 'outline' : ''">{{text || 'Button'}}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		text: String,
		outline: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	setup() {

	},
})
</script>

<style lang="scss" scoped>
	button {
		border: none;
		padding: .5rem 1rem;
		font-weight: 600;
		border-radius: 4px;
		background: $primary;
		color: $dark;
		font-size: 1.25rem;

		&:focus {
			outline: none;
		}

		&.outline {
			border: 2px solid $primary;
			background: transparent;
			color: $primary;
			font-weight: 500;
		}
	}
</style>
