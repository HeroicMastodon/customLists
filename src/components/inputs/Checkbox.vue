<script lang="ts" setup>
import { defineComponent } from 'vue'

const props = defineProps<{
	value: boolean,
	label: string
}>()

const emit = defineEmits<{
	(e: 'update:value', value: boolean): void
}>();

function handleCheck(e: any) {
  console.log(props.value)
	emit('update:value', !props.value);
}

</script>

<template>
  <div class="container">
    <label >
      {{props.label}}:
    </label>
    <input type="checkbox" class="checkbox" :checked="props.value" :value="props.value" @change="handleCheck">
  </div>
</template>

// <style lang="scss" scoped>
.container.container {
  display: inline-block;
}
// $checkboxLength: 1rem;
// .container {
//   display: block;
//   position: relative;
//   padding-left: 35px;
//   margin-bottom: 12px;
//   cursor: pointer;
//   font-size: 22px;
//   -webkit-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
// }

// /* Hide the browser's default checkbox */
// .container input {
//   position: absolute;
//   opacity: 0;
//   cursor: pointer;
//   height: 0;
//   width: 0;
// }

// /* Create a custom checkbox */
// .checkmark {
//   position: absolute;
//   top: 0;
//   left: 0;
//   height: $checkboxLength;
//   width: $checkboxLength;
//   background-color: #eee;
// }

// /* On mouse-over, add a grey background color */
// .container:hover input ~ .checkmark {
//   background-color: #ccc;
// }

// /* When the checkbox is checked, add a blue background */
// .container input:checked ~ .checkmark {
//   background-color: #2196F3;
// }

// /* Create the checkmark/indicator (hidden when not checked) */
// .checkmark:after {
//   content: "";
//   position: absolute;
//   display: none;
// }

// /* Show the checkmark when checked */
// .container input:checked ~ .checkmark:after {
//   display: block;
// }

// /* Style the checkmark/indicator */
// .container .checkmark:after {
//   left: 9px;
//   top: 5px;
//   width: 5px;
//   height: 10px;
//   border: solid white;
//   border-width: 0 3px 3px 0;
//   -webkit-transform: rotate(45deg);
//   -ms-transform: rotate(45deg);
//   transform: rotate(45deg);
// }
</style>