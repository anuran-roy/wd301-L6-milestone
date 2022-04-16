export type stringOrnumber = string | number;

export type textFieldTypes =
  | "text"
  | "email"
  | "url"
  | "password"
  | "number"
  | "tel"
  | "date";

export type TextField = {
  id: number;
  kind: "text";
  label: string;
  fieldType: string;
  value: string;
};

export type DropdownField = {
  id: number;
  kind: "dropdown";
  label: string;
  options: string[];
  value: string;
};

export type RadioField = {
  id: number;
  kind: "radio";
  label: string;
  options: string[];
  value: string;
};

export type MultiselectField = {
  id: number;
  kind: "multiselect";
  label: string;
  options: string[];
  value: string[];
};

export type TextareaField = {
  id: number;
  kind: "textarea";
  label: string;
  value: string;
};
export type formFieldType =
  | TextField
  | DropdownField
  | RadioField
  | MultiselectField
  | TextareaField;

export type fieldKind =
  | "text"
  | "dropdown"
  | "radio"
  | "multiselect"
  | "textarea";

export function itemAt<T>(index: number, arr: T[]): T {
  return arr[index];
}

// type User = {
//   name: string;
//   age: number;
//   email: string;
// }

// type PartialUser = {
//   name: string;
//   age: number;
// }

// enum ActionTypes {
//   ADD_FIELD,
//   REMOVE_FIELD,
// }

type AddAction = {
  type: "add_field";
  kind: fieldKind;
  label: string;
  callback: () => void;
};

type RemoveAction = {
  type: "remove_field";
  id: number;
};

type UpdateTitle = {
  type: "update_title";
  title: string;
};

type UpdateLabel = {
  type: "update_label";
  id: number;
  updatedLabel: string;
};

type RemoveLabel = {
  type: "remove_label";
  id: number;
};

type AddOption = {
  type: "add_option";
  option: string;
  id: number;
};

type RemoveOption = {
  type: "remove_option";
  option: string;
  field_id: number;
};

export type formAction =
  | AddAction
  | RemoveAction
  | UpdateTitle
  | AddOption
  | RemoveOption
  | UpdateLabel
  | RemoveLabel;

export type ChangeText = {
  type: "change_text";
  value: string;
};

export type ClearText = {
  type: "clear_text";
};

export type newFieldActions = ChangeText | ClearText;
