import { formFieldType } from "../types/formTypes";

const initialFormFields: formFieldType[] = [
  { kind: "text", id: 1, label: "First Name", fieldType: "text", value: "" },
  { kind: "text", id: 2, label: "Last Name", fieldType: "text", value: "" },
  // { kind: "text", id: 3, label: "Email", fieldType: "email", value: "" },
  {
    kind: "dropdown",
    id: 3,
    label: "Email",
    options: ["gmail", "hotmail"],
    value: "",
  },
  { kind: "text", id: 4, label: "Date of Birth", fieldType: "date", value: "" },
  {
    kind: "radio",
    id: 5,
    label: "Gender",
    options: ["Male(M)", "Female(F)", "Other(X)"],
    value: "",
  },
  {
    kind: "multiselect",
    id: 6,
    label: "Domain of work",
    options: [
      "Frontend Web Dev",
      "Backend Web Dev",
      "Full Stack Web Dev",
      "AI/ML",
      "Blockchain",
    ],
    value: [],
  },
  { kind: "textarea", id: 7, label: "About", value: "" },
];

export default initialFormFields;
