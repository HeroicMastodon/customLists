export interface List {
	name: string;
	itemDefinition: ItemDefinition;
	items: Item[];
}


export interface Item {
	fields: Field[];
}

export type ItemDefinition = FieldDefinition[];


export interface Field {
	itemType: FieldType;
	itemValue: FieldValue;
}

export interface FieldDefinition<T = any> {
	itemType: FieldType;
	defaultValue?: FieldValue | DefaultValueFactory<T>;
	required: boolean;
}

export type FieldType = 'select' | 'text' | 'text area' | 'radio' | 'number' | 'date' | 'time';
export const FieldTypeOptions = ['select', 'text', 'text area', 'radio', 'number', 'date', 'time'];
export type FieldValue = string | number | SelectableValue;
export interface DefaultValueFactory<T> {
	(arg: T): FieldValue;
}

export interface SelectableValue {
	index: number;
	value: string;
}