<script lang="ts" setup>
import { reactive, watch, watchEffect } from "vue";
import TextInput from "@/components/inputs/TextInput.vue";
import SelectInput from "../inputs/SelectInput.vue";
import Checkbox from "@/components/inputs/Checkbox.vue";
import {
  FieldTypeOptions,
  Item,
  List,
} from "@/models/list";

const props =
    defineProps<{
      value: List;
    }>();

const emits =
    defineEmits<{
      (e: "update:value", value: List): void;
    }>();

const listDefinition = reactive(props.value);

watchEffect(() => {
  // listDefinition.name = props.value.name;
  // listDefinition.fieldDefinitions = props.value.fieldDefinitions;
  // listDefinition.items = props.value.items;
  Object.assign(listDefinition, props.value)
});
// watchEffect(() => {
//   emits("update:value", listDefinition);
// });



function addField() {
  listDefinition.fieldDefinitions.push({
    name: "",
    type: "text",
    required: false,
    position: listDefinition.fieldDefinitions.length,
  });
  updateItems(item => {
    item.fields.push({
      type: "text",
      value: "",
      position: listDefinition.fieldDefinitions.length
    })
  });
}

function updateItems(update: (item: Item) => void) {
  for (let item of listDefinition.items) {
    update(item)
  }
  emits('update:value', listDefinition);
}

function updatePositions() {
  listDefinition.fieldDefinitions.forEach((item, index) => {
    item.position = index;
  });
  updateItems(item => item.fields.forEach((field, index) => field.position = index))
}


function removeField(index: number) {
  listDefinition.fieldDefinitions.splice(index, 1);

  updateItems(item => item.fields.splice(index, 1));

  updatePositions();
}

function moveFieldUp(index: number) {
  const item = listDefinition.fieldDefinitions.splice(index, 1)[0];

  if (index == 0) {
    listDefinition.fieldDefinitions.push(item);
  } else {
    listDefinition.fieldDefinitions.splice(index - 1, 0, item);
  }

  updateItems(item => {
    const field = item.fields.splice(index, 1)[0];
    if (index == 0) {
      item.fields.push(field);
    } else {
      item.fields.splice(index - 1, 0, field);
    }
  });

  updatePositions();
}

function moveFieldDown(index: number) {
  const isLast = index == listDefinition.fieldDefinitions.length - 1;
  const item = listDefinition.fieldDefinitions.splice(index, 1)[0];

  if (isLast) {
    listDefinition.fieldDefinitions.unshift(item);
  } else {
    listDefinition.fieldDefinitions.splice(index + 1, 0, item);
  }

  updateItems(item => {
    const field = item.fields.splice(index, 1)[0];
    if (isLast) item.fields.unshift(field);
    else item.fields.splice(index + 1, 0, field);
  })

  updatePositions();
}
</script>

<template>
  <div class="list-form">
    <div class="heading">
      <TextInput class="header-text" v-model:value="listDefinition.name" label="List Name"/>
      <button @click="addField">Add Field</button>
    </div>
    <div
        v-for="(field, index) in listDefinition.fieldDefinitions"
        :key="index"
        class="field"
    >
      <TextInput
          v-model:value="field.name"
          label="Field Name"
          class="field-name"
      />
      <SelectInput
          :options="FieldTypeOptions"
          v-model:value="field.type"
          class="field-options"
      />
      <TextInput class="select-options" v-if="field.type === 'select'" v-model:value="field.options" label="Options (comma separated)"/>
      <!-- <input type="checkbox" class="checkbox" v-model="field.required" /> -->
      <Checkbox v-model:value="field.required" label="Required"/>
      <div class="controls">
        <button @click="moveFieldUp(index)">up</button>
        <button @click="moveFieldDown(index)">down</button>
        <button class="remove-button" @click="removeField(index)">X</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-form {
  min-width: 320px;

  .heading {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    .header-text {
      max-width: 320px;
    }
  }

  .field {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    .field-name {
      width: 8rem;
    }

    .field-options {
      width: 4rem;
    }

    .controls {
      display: flex;
      align-items: center;;
      gap: 1rem;

      button {
        font-size: .75rem;
      }
    }

    .select-options {
      width: 5rem;
    }
  }
}
</style>
