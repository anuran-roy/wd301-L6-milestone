import formDataType from "../types/formDataType";

const saveForms = (localForms: formDataType[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

export default saveForms;
