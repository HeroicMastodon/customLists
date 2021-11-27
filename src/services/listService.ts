import { Item, List } from "@/models/list";
import { reactive, readonly } from "vue";
import { api } from "@/server/api";
import { AxiosResponse } from "axios";
import "@/util/arrayUtils"

export interface ApiError {
    message: string;
}

const store: {lists: List[]} = reactive({lists: []});

function getErrorMessage(response: AxiosResponse) {
    return "message" in response.data ? response.data.message : "";
}

function getLists() {
    return readonly(store);
}

function getItemsList(item: Item) {
    const list = store.lists.find(list => list.id == item.listId);

    if (! list) throw new Error("item does not belong to a list");
    return list;
}

const baseUrl = "customlists";

export const listService = {
    getLists,
    fetchLists: async () => {
        const response = await api.get<List[]>(baseUrl);

        if (response.status != 200) throw new Error(getErrorMessage(response));
        store.lists = response.data as List[];

        return getLists();
    },
    createList: async (list: List) => {
        const response = await api.post<List>(baseUrl, list);
        if (response.status != 200) throw new Error(getErrorMessage(response));

        store.lists.push(response.data);

        return getLists();
    },
    updateList: async (list: List) => {
        const response = await api.patch<List>(baseUrl, list);
        if (response.status != 200) throw new Error(getErrorMessage(response));

        store.lists.replace(item => item.id == list.id, list);

        return getLists();
    },
    deleteList: async (list: List) => {
        if (!list.id) throw new Error("Cannot delete list with no id");
        const response = await api.delete<List>(baseUrl + '/' + list.id);

        if (response.status !== 200) throw new Error(getErrorMessage(response));

        store.lists.remove(item => item.id == list.id);

        return getLists();
    },
    createItem: async (item: Item) => {
        const response = await api.post<Item>(baseUrl + "/item", item);

        if (response.status !== 200) throw new Error(getErrorMessage(response));

        const list = getItemsList(item);
        list.items.push(response.data);

        return readonly(list);
    },
    updateItem: async (item: Item) => {
        const response = await api.patch<Item>(baseUrl + "/item", item);

        if (response.status !== 200) throw new Error(getErrorMessage(response));
        const list = getItemsList(item);
        list.items.replace(line => line.id == item.id, item);

        return readonly(list);
    },
    deleteItem: async (item: Item) => {
        if (!item.id) throw new Error("Cannot delete item with no id");
        const response = await api.delete(`${baseUrl}/${item.listId}/${item.id}`);

        if (response.status != 200) throw new Error(getErrorMessage(response));

        const list = getItemsList(item);
        list.items.remove(line => line.id == item.id);

    }
}