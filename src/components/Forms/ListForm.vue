<script lang="ts" setup>
import { nextTick, reactive, ref, watchEffect } from "vue";
import TextInput from "@/components/inputs/TextInput.vue";
import SelectInput from "../inputs/SelectInput.vue";
import Checkbox from "@/components/inputs/Checkbox.vue";
import {
  FieldType,
  FieldTypeOptions,
  Item,
  ItemDefinition,
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
  emits("update:value", listDefinition);
});

watchEffect(() => {
  listDefinition.name = props.value.name;
  listDefinition.itemDefinition = props.value.itemDefinition;
  listDefinition.items = props.value.items;
});

function addField() {
  listDefinition.itemDefinition.push({
    name: "",
    itemType: "text",
    required: false,
    position: listDefinition.itemDefinition.length,
  });
  updateItems(item => {
    item.fields.push({
      itemType: "text",
      itemValue: "",
      position: listDefinition.itemDefinition.length
    })
  });
}

function updateItems(update: (item: Item) => void) {
  for (let item of listDefinition.items) {
    update(item)
  }
}

function updatePositions() {
  listDefinition.itemDefinition.forEach((item, index) => {
    item.position = index;
  });
  updateItems(item => item.fields.forEach((field, index) => field.position = index))
}


function removeField(index: number) {
  listDefinition.itemDefinition.splice(index, 1);

  updateItems(item => item.fields.splice(index, 1));

  updatePositions();
}

function moveFieldUp(index: number) {
  const item = listDefinition.itemDefinition.splice(index, 1)[0];

  if (index == 0) {
    listDefinition.itemDefinition.push(item);
  } else {
    listDefinition.itemDefinition.splice(index - 1, 0, item);
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
  const isLast = index == listDefinition.itemDefinition.length - 1;
  const item = listDefinition.itemDefinition.splice(index, 1)[0];

  if (isLast) {
    listDefinition.itemDefinition.unshift(item);
  } else {
    listDefinition.itemDefinition.splice(index + 1, 0, item);
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
        v-for="(field, index) in listDefinition.itemDefinition"
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
          v-model:value="field.itemType"
          class="field-options"
      />
      <TextInput class="select-options" v-if="field.itemType === 'select'" v-model:value="field.options" label="Options (comma separated)"/>
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
