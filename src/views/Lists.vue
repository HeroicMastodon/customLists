<template>
<Modal :open="false">
    <ListForm :value="list"/>
</Modal>
  <ItemForm v-model:value="item" :definition="itemDef"/>
</template>

<script lang="ts" setup>
import { defineComponent, useAttrs } from "vue";
import { userService, useUsers } from "@/services/userService";
import ListForm from "@/components/Forms/ListForm.vue";
import { Field, Item, ItemDefinition, List } from "@/models/list";
import ItemForm from "@/components/Forms/ItemForm.vue";
import Modal from "@/components/Modal.vue";
import Login from "@/views/Login.vue";
const props = useAttrs();
console.log(props)
const itemDef: ItemDefinition = [{ "name": "text", "type": "text", "required": false, "position": 0 },
  {
    "name": "select",
    "type": "select",
    "required": false,
    "position": 1,
    "options": "option 1, option 2, option 3, option 4"
  },
  { "name": "text area", "type": "text area", "required": false, "position": 2 },
  { "name": "number", "type": "number", "required": false, "position": 3 },
  { "name": "date", "type": "date", "required": false, "position": 4 },
  { "name": "time", "type": "time", "required": false, "position": 5 },
  { "name": "checkbox", "type": "check box", "required": false, "position": 6 }]
const item: Item = {
  fields: itemDef.reduce<Field[]>((prev, curr) => {
    prev.push({
      type: curr.type,
      value: "",
      position: curr.position
    });
    return prev;
  }, [])
}
const user = useUsers();

const list: List = {
  name: '',
  fieldDefinitions: [],
  items: []
}

</script>

<style lang="scss" scoped>
.list {
}
</style>