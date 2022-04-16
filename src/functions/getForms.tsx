import formDataType from "../types/formDataType";

const getForms: () => formDataType[] = () => {
  let savedFormsJSON = localStorage.getItem("savedForms");
  let persistentForms = savedFormsJSON ? JSON.parse(savedFormsJSON) : [];

  return persistentForms;
};

export default getForms;
