import React, { useState, useEffect } from "react";
import AppContainer from "./AppContainer";
import Header from "./Header";
import { navigate, Redirect } from "raviger";
import formDataType from "../types/formDataType";
import responseDataType from "../types/responseDataType";
import getForms from "../functions/getForms";
import getResponses from "../functions/getResponses";
import saveResponses from "../functions/saveResponses";
import {
  TextFieldInput,
  DropdownFieldInput,
  RadioFieldInput,
  TextAreaInput,
  MultiselectFieldInput,
} from "./Preview/PreviewInput";

import { formFieldType, updatePreviewAction } from "../types/formTypes";


export default function Preview(props: { formId: number }) {
  const getForm: () => formDataType = () => {
    const localForm = getForms().filter((form) => form.id === props.formId)[0];

    return localForm;
  };

  const initialResponseState = () => {
    const localResponses = getResponses();
    const relevantForm = getForm();
    const relevantResponse = localResponses.filter(
      (response) =>
        response.id === props.formId && response.hash === relevantForm.hash
    );

    if (relevantResponse.length > 0) {
      return relevantResponse[0];
    }

    const formDetails = getForm();
    const newResponse = {
      last_modified: new Date().toString(),
      id: props.formId,
      hash: relevantForm.hash,
      title: formDetails.title,
      formFields: formDetails.formFields,
    };

    saveResponses([...localResponses, newResponse]);
    return newResponse;
  };

  const [question, setQuestion] = useState(0);
  const [responseState, setResponseState] = useState(() =>
    initialResponseState()
  );

  const emptyForm = () => {
    alert("Form Empty. Returning to home screen...");
    // navigate("/");
    return <Redirect to="/" />;
  };

  const gotoNextQuestion = () => {
    if (question < responseState.formFields.length - 1) {
      setQuestion(question + 1);
    } else {
      alert("You are at the last question!");
    }
  };

  const gotoPreviousQuestion = () => {
    if (question > 0) {
      setQuestion(question - 1);
    } else {
      alert("You are at the first question!");
    }
  };

  const gotoFirstQuestion = () => {
    setQuestion(0);
  };

  const gotoLastQuestion = () => {
    setQuestion(responseState.formFields.length - 1);
  };

  const closePreview = () => {
    navigate("/");
  };

  const saveResponse = (toSaveResponse: responseDataType) => {
    saveResponses([
      ...getResponses().filter((response) => response.id !== toSaveResponse.id),
      toSaveResponse,
    ]);
  };

  useEffect(() => {
    saveResponse({ ...responseState, last_modified: new Date().toString() });
  }, [question, responseState]);

  const reducer = (state: responseDataType, updateAction: updatePreviewAction) => {
    switch(updateAction.type) {
      case "update_text":
        return {
          ...state,
          formFields: state.formFields.map((field) => {
            if (field.id !== updateAction.id || field.kind !== "text") {
              return field;
            } else {
              return {
                ...field,
                value: updateAction.updated_value,
              };
            }
          }),
        };
      case "update_textarea":
        return {
          ...state,
          formFields: responseState.formFields.map((field) => {
            if (field.id !== updateAction.id || field.kind !== "textarea") {
              return field;
            } else {
              return {
                ...field,
                value: updateAction.updated_value,
              };
            }
          }),
        };
      case "update_select":
        return {
          ...state,
          formFields: state.formFields.map((field) => {
            if (field.id !== updateAction.id || (field.kind !== "dropdown" && field.kind !== "radio")) {
              return field;
            } else {
              return {
                ...field,
                value: updateAction.updated_value,
              };
            }
          }),
        };
      case "update_multiselect":
        return {
          ...state,
          formFields: state.formFields.map((field) => {
            if (field.id !== updateAction.id || field.kind !== "multiselect") {
              return field;
            } else {
              return {
                ...field,
                value: updateAction.updated_value, // (() => updateValues(e_value, field.value))(),
              };
            }
          }),
        };
      default:
        throw new Error("Unknown Action definition!");
    }
  }

  const dispatchPreview = (updateAction: updatePreviewAction)=> {
    setResponseState((prevState: responseDataType) => reducer(prevState, updateAction));
  }

  const renderField = (field: formFieldType) => {
    switch (field.kind) {
      case "text":
        return (
          <TextFieldInput
            id={field.id}
            key={`question-${field.id}`}
            label={field.label}
            fieldType={field.fieldType}
            value={field.value}
            updateTextInputCB={
              // updateTextInput
              (e_value: string, fieldId: number) => {
                dispatchPreview({
                  type: "update_text",
                  id: fieldId,
                  updated_value: e_value,
                });
              }
            }
          />
        );
      case "dropdown":
        return (
          <DropdownFieldInput
            id={field.id}
            label={field.label}
            options={field.options}
            value={field.value}
            updateDropdownCB={(e_value: string, fieldId: number) => {
              dispatchPreview({
                type: "update_select",
                id: fieldId,
                updated_value: e_value,
              });
            }}
          />
        );
      case "radio":
        return (
          <div>
            <RadioFieldInput
              id={field.id}
              label={field.label}
              options={field.options}
              value={field.value}
              // updateDropdownCB={updateDropdownInput}
              updateRadioCB={(e_value: string, fieldId: number) => {
                dispatchPreview({
                  type: "update_select",
                  id: fieldId,
                  updated_value: e_value,
                });
              }}
            />
          </div>
        );

      case "multiselect":
        return (
          // <div>This is a multiselect field</div>
          <MultiselectFieldInput
            id={field.id}
            label={field.label}
            options={field.options}
            value={field.value}
            updateMultiselectCB={(e_value: string[], fieldId: number) => {
              dispatchPreview({
                type: "update_multiselect",
                id: fieldId,
                updated_value: e_value,
              });
            }}
          />
        );

      case "textarea":
        return (
          <div className="flex">
            <TextAreaInput
              id={field.id}
              value={field.value}
              label={field.label}
              updateTextAreaCB={(e_value: string, fieldId: number) => {
                dispatchPreview({
                  type: "update_textarea",
                  id: fieldId,
                  updated_value: e_value,
                });
              }}
            />
          </div>
        );
    }
  };

  return responseState.formFields.length === 0 ? (
    emptyForm()
  ) : (
    <AppContainer>
      <Header title=""></Header>
      <p className="flex justify-center py-5 text-3xl">{responseState.title}</p>
      <p className="my-5">
        <i>Last modified on:</i> {responseState.last_modified}
      </p>
      <p>Question {question + 1}</p>
      {renderField(responseState.formFields[question])}
      <div className="flex justify-center">
        <div
          onClick={(_) => {
            gotoPreviousQuestion();
          }}
          className="btn m-2 cursor-pointer rounded-md bg-sky-500 p-2 text-white hover:bg-sky-700"
        >
          &lt; Previous
        </div>
        <div
          onClick={(_) => {
            gotoNextQuestion();
          }}
          className="btn m-2 cursor-pointer rounded-md bg-sky-500 p-2 text-white hover:bg-sky-700"
        >
          Next &gt;
        </div>
      </div>
      <div className="flex justify-center">
        <div
          onClick={(_) => {
            gotoFirstQuestion();
          }}
          className="btn m-2 cursor-pointer rounded-md bg-sky-500 p-2 text-white hover:bg-sky-700"
        >
          &lt;&lt; First
        </div>
        <div
          onClick={(_) => {
            gotoLastQuestion();
          }}
          className="btn m-2 cursor-pointer rounded-md bg-sky-500 p-2 text-white hover:bg-sky-700"
        >
          Last &gt;&gt;
        </div>
        <div
          onClick={(_) => {
            closePreview();
          }}
          className="btn m-2 cursor-pointer rounded-md bg-sky-500 p-2 text-white hover:bg-sky-700"
        >
          Close Preview
        </div>
      </div>
    </AppContainer>
  );
}
