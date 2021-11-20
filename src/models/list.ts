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
	position: number;
}

export interface FieldDefinition<T = any> {
	name: string;
	itemType: FieldType;
	defaultValue?: FieldValue | DefaultValueFactory<T>;
	required: boolean;
	position: number;
    options?: string;
}

export type FieldType = 'select' | 'text' | 'text area' | 'radio' | 'number' | 'date' | 'time' | 'check box';
export const FieldTypeOptions = ['select', 'text', 'text area', 'radio', 'number', 'date', 'time', 'check box'];
export type FieldValue = string | number | SelectableValue;
export interface DefaultValueFactory<T> {
	(arg: T): FieldValue;
}

export interface SelectableValue {
	index: number;
	value: string;
}