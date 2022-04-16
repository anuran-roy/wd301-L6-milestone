import { formFieldType } from "./formTypes";

export default interface formDataType {
  created_on: string;
  id: number;
  hash: number;
  title: string;
  formFields: formFieldType[];
}
