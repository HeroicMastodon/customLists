<template>
	<div :class="`group ${type.startsWith('date') ? 'date' : ''} ${hasContentClass}`">
		<label>{{ label || "" }}</label>
		<input v-if="isLazy" v-model.lazy="actual" :type="inputType" :maxlength="maxLength" :minlength="minLength"/>
		<input v-else v-model="actual" :type="inputType" />
		<div class="btm"></div>
		<div :data-hover="error || ''" :class="`error ${error ? '' : 'no-hover'}`">{{error || ''}}</div>
	</div>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	PropType,
	ref,
	watch,
	watchEffect,
} from "vue";

type Error = string | null;

export default defineComponent({
	props: {
		value: {
			type: String,
			required: true,
		},
		valueModifiers: {
			default: () => ({ lazy: false }),
		},
		label: {
			type: String,
		},
		obscureText: {
			type: Boolean,
			required: false,
			default: false,
		},
		hasError: {
			type: Boolean,
			required: false,
			default: false,
		},
		validators: {
			type: Array as PropType<Array<(val: string) => Error>>,
			required: false,
			default: () => [],
		},
		maxLength: {
			type: Number,
			required: false
		},
		minLength: {
			type: Number,
			required: false
		},
    type: {
      type: String,
      required: false,
      default: 'text'
    }
	},
	emits: [
		"update:value",
		"update:hasError"
	],
	setup(props, { emit }) {
		const actual = ref(props.value);
		const isLazy = ref(props.valueModifiers.lazy);
		const error = ref('');

		const hasContentClass = computed(() =>
			actual.value?.length > 0 ? "has-content" : ""
		);
		const inputType = computed(() => (props.obscureText ? "password" : props.type));

		watchEffect(() => {
			emit("update:value", `${actual.value}`);
		});

		watchEffect(() => {
			actual.value = props.value;
		})

		const validate = () => {
			let error: Error = null;
			for (const validator of props.validators) {
				error = validator(actual.value);

				if (error) break;
			}

			return error;
		};

		watch(actual, () => {
			error.value = validate() ?? '';
			emit('update:hasError', !!error.value);
		});

		// error.value = validate() ?? '';

		return {
			actual,
			hasContentClass,
			isLazy,
			inputType,
			error,
			validate
		};
	},
});
</script>

<style lang="scss" scoped>
.group {
	$h-padding: 0rem;
	$v-padding: 0.5rem;
	$transition-length: 250ms;
	$btm-color: $primary;

	margin-top: 1rem;
	position: relative;
	width: 100%;

	label {
		position: absolute;
		padding-left: $h-padding;
		padding-top: $v-padding;
		pointer-events: none;
		top: 0;

		transition: all ease $transition-length;
	}

  input[type="date"]::-webkit-calendar-picker-indicator {
    //display: none;
    //-webkit-appearance: none;
    color: white;
  }

	&.has-content,
	&:focus-within,
  &.date{
		label {
			$offset: 0.75rem;
			$label-padding: -$offset - $v-padding;
			top: $label-padding;
			font-size: 0.75em;
		}
	}

	&:focus-within {
		//.btm {
		//	width: 100%;
		//	left: 0;
		//}

    input::after {
      width: 100%;
      left: 0;
    }
	}
	$btm-height: 0.2rem;

	input {
    $borderThickness: 1px;
		border: none;
		border-bottom: ($btm-height / 2) $text-light solid;
		width: 100%;
		padding: $v-padding $h-padding;
		background: transparent;
		color: $text-light;

		&:focus,
    &:focus-within{
			outline: none;

      &::after {
        width: 100%;
      }
		}

    &::after {
      content: "";

      background: $primary;

      height: 2px;
      width: 0;

      position: absolute;
      bottom: -$borderThickness;
      left: 0;

      transition: all $transition-length ease;
    }
	}

	.btm {
		position: absolute;
		height: $btm-height;
		background: $btm-color;
		width: 0;
		transition: all $transition-length ease;
		z-index: 2;
		//bottom: calc(-1px + 1.5rem);
    bottom: 0;
		left: 50%;
	}

	.error {
		margin-top: 0.5rem;
		height: 1rem;
		color: $error;
		text-align: left;
		font-size: .75rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		&::before {
			content: attr(data-hover);
			color: $error;
			width: fit-content;
			height: fit-content;
			visibility: hidden;
			opacity: 0;
			position: absolute;
			left: 0;
			background: $dark;
			border: solid $error 2px;
			padding: .25rem 1rem;
			border-radius: 3px;

			transition: all ease .5s;

			transition-delay: .5s;
		}

		&:hover {
			&::before {
				visibility: visible;
				opacity: 100;
				transition-delay: 0;
			}
		}

		&.no-hover {
			&::before {
				visibility: hidden;
			}
		}
	}
}
</style>