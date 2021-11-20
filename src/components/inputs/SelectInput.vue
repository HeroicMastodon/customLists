<template>
	<div class="select">
		<div :class="valueClass" @click="hasFocus = true" tabindex="1">
			{{ value }}
		</div>
		<div class="picklist">
			<div
				v-for="(option, index) in options"
				:key="index"
				class="item"
				@click="handleSelect(option)"
			>
			{{option}}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

const props =
	defineProps<{
		value: any;
		options: any[];
	}>();

const emit =
	defineEmits<{
		(e: "update:value", value: any): void;
	}>();

const hasFocus = ref(false);

const valueClass = computed(() =>
	hasFocus.value ? "value has-focus" : "value"
);

// watchEffect(() => emit('update:value', actual.value))

function handleSelect(value: any) {
	console.log(value);
	emit("update:value", value);
}
</script>

<style lang="scss" scoped>
.select {
	position: relative;
  min-width: 5rem;
	$transitionLength: .15s;
	.value {
		$borderThickness: 1px;
		border-bottom: $borderThickness $text-light solid;
		position: relative;
		padding: .25rem;
    min-height: 1rem;

		&::after {
			content: "";

			background: $primary;

			height: 2px;
			width: 0;

			position: absolute;
			bottom: -$borderThickness;
			left: 0;

			transition: all $transitionLength ease;
		}

		// &.has-focus
		&:focus,
		&:focus-within {
			&::after {
				width: 100%;
			}
		}
	}

	.picklist {
		position: absolute;
		height: 0;
		overflow-y: auto;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 2;
		margin-top: .5rem;
		border-radius: 5px;

		background: $dark;

		transition: all $transitionLength ease .1s;

		&:hover {
			cursor: pointer;
		}

		.item {
			width: 100%;
			padding: .25rem 0;
		}
	}

	.value:focus + .picklist {
		height: 8rem;
		opacity: 1;
		padding: .5rem 0;
    border: $primary solid 1px;
	}
}
</style>
