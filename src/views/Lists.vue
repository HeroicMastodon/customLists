<template>
  <Modal :open="formOpen" @close="handleFormClose">
    <ListForm v-model:value="list.value" />
<!--    <ListForm :value="list.value" @update:value="handleUpdate"/>-->
  </Modal>
  <Modal :open="deleteOpen" @close="deleteOpen = false">
    <h2> Are you sure?</h2>
    <p>Do you want to delete list "<b>{{ list.value.name }}</b>" containing <b>{{ list.value.items.length }}</b> items?</p>
    <div class="btns">
      <button class="outline" @click="handleDelete">Yes</button>
      <button @click="deleteOpen = false">No</button>
    </div>
  </Modal>
  <div class="heading">
    <h2>Overview</h2>
    <button @click="openForm()">New</button>
    <button @click="expanded = !expanded">Expand</button>
  </div>
  <div class="lists-container">
    <template v-for="list in state.lists" :key="list.id">
      <div @click="openList(list.id)" class="list">
        <h3>{{ list.name }}</h3>
        <div v-if="expanded" class="details">
          <div v-for="(field, idx) in list.fieldDefinitions" :key="idx">
            {{ field.name }}: {{ field.type }}
          </div>
        </div>
        <button class="list-btn edit-btn" @click.stop="openForm(list)">Edit</button>
        <button class="list-btn delete-btn" @click.stop="openDeleteConfirmation(list)">Delete</button>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import ListForm from "@/components/Forms/ListForm.vue";
import { defaultList, List } from "@/models/list";
import Modal from "@/components/Modal.vue";
import { listService } from "@/services/listService";

const state = listService.getLists();
const expanded = ref(false);
const formOpen = ref(false);
const deleteOpen = ref(false);
const list = reactive({ value: defaultList() });

onMounted(async () => {
  await listService.fetchLists();
})

function openForm(listToEdit?: List) {
  if (listToEdit) {
    list.value = listToEdit;
  } else {
    list.value = defaultList();
  }

  formOpen.value = true;
}

async function handleFormClose() {
  if (isDefaultList(list.value)) {
    formOpen.value = false;
    return;
  }

  try {
    if (list.value.id && list.value.id != "") {
      await listService.updateList(list.value);
    } else {
      await listService.createList(list.value);
    }
    console.log({ lists: state })

    formOpen.value = false;
  } catch (e) {
    console.error(e)
  }
}

function isDefaultList(test: List) {
  return test.name === '' && test.items.length === 0 && test.fieldDefinitions.length === 0;
}

function openDeleteConfirmation(listToDelete: List) {
  list.value = listToDelete;
  deleteOpen.value = true;
}

async function handleDelete() {
  console.log('deleting')
  await listService.deleteList(list.value);
  deleteOpen.value = false;
}

async function openList(id: string) {
  console.log('opening list with id: ' + id);
}

async function handleUpdate(updatedList: List) {
  console.log(updatedList)
  list.value = updatedList;
}

</script>

<style lang="scss" scoped>
.heading {
  display: flex;
  margin: 1rem;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
}
.lists-container {
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
  gap: 1rem;
  justify-content: center;

  .list {
    background-color: $dark;
    padding: .5rem;
    border-radius: 5px;
    position: relative;
    min-width: 8rem;

    .details {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: .5rem;
    }


    .list-btn {
      position: absolute;

      &.edit-btn {
        right: 0;
        bottom: 0;
      }

      &.delete-btn {
        right: 0;
        top: 0;
      }
    }
  }
}
</style>