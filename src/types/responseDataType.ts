import { formFieldType } from "./formTypes";

export default interface responseDataType {
  last_modified: string;
  id: number;
  hash: number;
  title: string;
  formFields: formFieldType[];
}
