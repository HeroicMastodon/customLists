<template>
  <Modal :open="formOpen" @close="handleFormClose">
    <ListForm v-model:value="list.value"/>
    <!--    <ListForm :value="list.value" @update:value="handleUpdate"/>-->
  </Modal>
  <Modal :open="deleteOpen" @close="deleteOpen = false">
    <h2> Are you sure?</h2>
    <p>Do you want to delete list "<b>{{ list.value.name }}</b>" containing <b>{{ list.value.items.length }}</b> items?
    </p>
    <div class="btns">
      <button class="outline" @click="handleDelete">Yes</button>
      <button @click="deleteOpen = false">No</button>
    </div>
  </Modal>
  <div class="container">
    <div class="heading">
      <h2>Overview</h2>
      <button @click="openForm()">
       <span class="material-icons-outlined">
        add_circle_outline
        </span>
      </button>
      <button @click="expanded = !expanded">
       <span class="material-icons-outlined">
expand
</span>
      </button>
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
          <button class="list-btn edit-btn" @click.stop="openForm(list)">
            <span class="material-icons-outlined">edit</span>
          </button>
          <button class="list-btn delete-btn" @click.stop="openDeleteConfirmation(list)">
            <span class="material-icons-outlined">delete</span>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import ListForm from "@/components/Forms/ListForm.vue";
import { defaultList, List } from "@/models/list";
import Modal from "@/components/Modal.vue";
import { listService } from "@/services/listService";
import { useRouter } from "vue-router";

const state = listService.getLists();
const expanded = ref(false);
const formOpen = ref(false);
const deleteOpen = ref(false);
const list = reactive({ value: defaultList() });
const router = useRouter();

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
  await router.push('/' + id);
}

async function handleUpdate(updatedList: List) {
  console.log(updatedList)
  list.value = updatedList;
}

</script>

<style lang="scss" scoped>
.container {
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    border-radius: 50%;
    padding: 0;
    height: 1.3em;
    width: 1.3em;
    margin: .2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
      cursor: pointer;

      .details {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: .5rem;
      }


      .list-btn {
        position: absolute;
        //background: transparent;
        //color: $text-light;
        border-radius: 50%;
        padding: 0;
        height: 1.3em;
        width: 1.3em;
        margin: .2rem;

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
}

.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>