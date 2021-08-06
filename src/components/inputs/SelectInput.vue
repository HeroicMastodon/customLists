<template>
	<div>
		Select Input
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, watchEffect, ref } from 'vue'

export default defineComponent({
	props: {
		value: {
			required: true
		},
		options: {
			type: Array,
			required: true
		}
	},
	emits: [
		'update:value'
	],
	setup(props, {emit}) {
		const actual = ref(props.value);

		watchEffect(() => emit('update:value', actual.value))

		return {
			actual
		}
	},
})
</script>

<style lang="scss" scoped>

</style>
