export interface List {
    id?: string;
    ownerId?: string;
	name: string;
	fieldDefinitions: ItemDefinition;
	items: Item[];
}

export const defaultList = (): List => {
    return {
        name: "",
        fieldDefinitions: [],
        items: []
    }
}



export interface Item {
    id?: string;
	fields: Field[];
    listId: string;
}

export const defaultItem = (definition: ItemDefinition, listId: string): Item => {
    const fields: Field[] = [];

    definition.forEach(field => {
       fields.push({
           value: field.defaultValue ?? "",
           position: field.position,
           type: field.type
       });
    });
    return {
        fields,
        listId
    }
}

export type ItemDefinition = FieldDefinition[];


export interface Field {
	type: FieldType;
	value: FieldValue;
	position: number;
}

export interface FieldDefinition<T = any> {
	name: string;
	type: FieldType;
	defaultValue?: FieldValue;
	required: boolean;
	position: number;
    options?: string;
}

export type FieldType = 'select' | 'text' | 'text area' | 'radio' | 'number' | 'date' | 'time' | 'check box';
export const FieldTypeOptions = ['select', 'text', 'text area', 'radio', 'number', 'date', 'time', 'check box'];
export type FieldValue = string;
export interface DefaultValueFactory<T> {
	(arg: T): FieldValue;
}

export interface SelectableValue {
	index: number;
	value: string;
}