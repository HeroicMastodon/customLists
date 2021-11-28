<script lang="ts" setup>
import { listService } from "@/services/listService";

const props = defineProps<{
  id: string;
}>();

import { defaultList, List, Item, defaultItem } from "@/models/list";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import ItemTable from "@/components/ItemTable.vue";
import Modal from "@/components/Modal.vue";
import ItemForm from "@/components/Forms/ItemForm.vue";
import ItemCard from "@/components/ItemCard.vue";

const router = useRouter();
const list: List = reactive(defaultList());
const formOpen = ref(false);

onMounted(async () => {
  console.log(props)
  let lists = listService.getLists().lists;
  if (! lists.length) {
    lists = (await listService.fetchLists()).lists;
  }

  const fetchedList = lists.find(line => line.id == props.id);

  if (! fetchedList) await router.replace('/');
  else {
    Object.assign(list, fetchedList);
  }
});

function newItem() {
  return reactive(defaultItem(list.fieldDefinitions, list.id ?? ""));
}

const item = ref(newItem());

async function handleItemUpdate() {
  try {
    let result: List;
    if (! item.value.id) result = await listService.createItem(item.value) as List;
    else result = await listService.updateItem(item.value) as List;
    Object.assign(list, result);
    formOpen.value = false;
  } catch (e) {
    console.error(e)
  }
}

function openForm(itemToEdit?: Item) {
  if (itemToEdit) {
    item.value = itemToEdit;
  } else {
    item.value = newItem();
  }

  formOpen.value = true;
}

async function handleDelete(item: Item) {
  try {
    await listService.deleteItem(item);
  } catch (e) {
    console.log(e)
  }
}

type View = 'table' | 'card';
const view = ref<View>('table');

function updateView(newView: View) {
  view.value = newView;
}

</script>

<template>
  <Modal :open="formOpen" @close="handleItemUpdate">
    <ItemForm :definition="list.fieldDefinitions" :value="item"></ItemForm>
  </Modal>
  <div class="container">
    <div class="heading">
      <h2>{{ list.name }}</h2>
      <button @click="openForm()">New</button>
      <button @click="updateView('card')">Card</button>
      <button @click="updateView('table')">Table</button>
    </div>
    <div class="items-container">
      <ItemCard v-if="view === 'card'" :definition="list.fieldDefinitions" :items="list.items" @edit="openForm"
                @delete="handleDelete"
      />
      <ItemTable v-else :definition="list.fieldDefinitions" :items="list.items" @edit="openForm"
                 @delete="handleDelete"
      />
    </div>
  </div>
</template>

<style scoped>
.items-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

</style>