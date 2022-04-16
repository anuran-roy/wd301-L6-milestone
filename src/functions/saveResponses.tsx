import responseDataType from "../types/responseDataType";

const saveResponses = (localResponses: responseDataType[]) => {
  localStorage.setItem("savedResponses", JSON.stringify(localResponses));
};

export default saveResponses;
