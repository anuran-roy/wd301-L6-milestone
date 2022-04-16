import responseDataType from "../types/responseDataType";

const getResponses: () => responseDataType[] = () => {
  let savedFormsJSON = localStorage.getItem("savedResponses");
  let persistentForms = savedFormsJSON ? JSON.parse(savedFormsJSON) : [];

  return persistentForms;
};

export default getResponses;
