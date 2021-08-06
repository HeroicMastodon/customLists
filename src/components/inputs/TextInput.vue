<template>
	<div :class="`group ${hasContentClass}`">
      <label>{{label || 'Label'}}</label>
      <input v-if="isLazy" v-model.lazy="actual" type="text">
      <input v-else v-model="actual" type="text">
	  <div class="btm"></div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, watchEffect } from 'vue'

export default defineComponent({
	props: {
		value: {
			type: String,
			required: true
		},
		valueModifiers: {
			default: () => ({lazy: false})
		},
		label: {
			type: String
		}
	},
	emits: [
		'update:value'
	],
	setup(props, {emit}) {
		const actual = ref(props.value);
		const isLazy = ref(props.valueModifiers.lazy)

		const hasContentClass = computed(() => actual.value.length > 0 ? 'has-content' : '');
		
		watchEffect(() => {
			emit('update:value', actual.value);
		});

		return {
			actual,
			hasContentClass,
			isLazy
		}
	},
})
</script>

<style lang="scss" scoped>
.group {
	$h-padding: 0rem;
	$v-padding: .5rem;
	$transition-length: 250ms;
	$btm-color: blue;

	margin-top: 1rem;

	position: relative;

	width: fit-content;


	label {
		position: absolute;
		padding-left: $h-padding;
		padding-top: $v-padding;
		pointer-events: none;
		top: 0;

		transition: all ease $transition-length;
	}


	&:focus-within, &.has-content {
		label {
			$offset: .75rem;
			$label-padding: -$offset - $v-padding;
			top: $label-padding;
			font-size: .75em;
		}

		.btm {
			width: 100%;
		}
	}
	$btm-height: .2rem;

	input {
		border: none;
		border-bottom: ($btm-height / 2) black solid;
		

		padding: $v-padding $h-padding;

		&:focus {
			outline: none;
		}
	}

	.btm {
		position: absolute;
		height: $btm-height;
		background: $btm-color;
		width: 0;
		transition: width $transition-length ease;
		z-index: 2;
		bottom: -1px;
	}
}
</style>