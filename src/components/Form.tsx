import React, { useState, useEffect, useReducer } from "react";
import { LabelText } from "./Labels/LabelText";
import { LabelTextarea } from "./Labels/LabelTextarea";
import { LabelSelect } from "./Labels/LabelSelect";
import { LabelRadio } from "./Labels/LabelRadio";
import { LabelMultiselect } from "./Labels/LabelMultiselect";

import getForms from "../functions/getForms";
import saveForms from "../functions/saveForms";
import formDataType from "../types/formDataType";
import AppContainer from "./AppContainer";
import { Link } from "raviger";
import initialFormFields from "../presets/initialFormFields";

import Header from "./Header";
import {
  formFieldType,
  formAction,
  fieldKind,
  newFieldActions,
} from "../types/formTypes";

export default function Form(props: { formId: number }) {
  const initialFormState: () => formDataType = () => {
    const localForms = getForms();

    if (localForms.length > 0) {
      return localForms.filter((form) => form.id === props.formId)[0];
    }

    const newForm = {
      created_on: new Date().toString(),
      hash: Number(new Date()),
      id: Number(new Date()),
      title: "New Untitled Form",
      formFields: initialFormFields,
    };

    saveForms([...localForms, newForm]);
    return newForm;
  };

  const newFieldReducer = (state: string, action: newFieldActions) => {
    switch (action.type) {
      case "change_text":
        return action.value;
      case "clear_text":
        return "";
      default:
        throw new Error("Error in newFieldReducer!");
    }
  };

  const [formState, setFormState] = useState(() => initialFormState());
  const [newField, dispatchNewFieldAction] = useReducer(newFieldReducer, "");

  const initialAutoSaveState: () => boolean = () => {
    let prevAutoSaveState = localStorage.getItem("autoSave");
    let persistentAutoSaveState: boolean = prevAutoSaveState
      ? JSON.parse(prevAutoSaveState)
      : false;

    return persistentAutoSaveState;
  };

  const [autoSaveState, setAutoSaveState] = useState(initialAutoSaveState());

  const saveForm = (currentState: formDataType) => {
    const localForms = getForms();
    const updatedLocalForms = localForms.map((form) => {
      return form.id === currentState.id ? currentState : form;
    });
    saveForms(updatedLocalForms);
    localStorage.setItem("autoSave", JSON.stringify(autoSaveState));
  };

  useEffect(() => {
    if (autoSaveState === true) {
      const timeout = setTimeout(() => {
        saveForm(formState);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [formState]);

  const switchAutoSave = () => {
    if (autoSaveState === true) {
      setAutoSaveState(false);
    } else {
      setAutoSaveState(true);
    }
  };

  const clearLabels = () => {
    setFormState({
      ...formState,
      formFields: formState.formFields.map((field) => {
        return { ...field, label: "" };
      }),
    });
  };

  const addOption = (option: string, id: number) => {
    if (option.length === 0) {
      alert("Can't add a field with empty name!");
    } else {
      setFormState({
        ...formState,
        hash: Number(new Date()),
        formFields: formState.formFields.map((field: formFieldType) => {
          switch (field.kind) {
            case "dropdown":
            case "radio":
            case "multiselect":
              if (field.id === id && !field.options.includes(option)) {
                return {
                  ...field,
                  options: [...field.options, option],
                };
              } else {
                return field;
              }

            default:
              return field;
          }
        }),
      });
    }
  };

  const removeOption = (option: string, field_id: number) => {
    setFormState({
      ...formState,
      hash: Number(new Date()),
      formFields: formState.formFields.map((field: formFieldType) => {
        switch (field.kind) {
          case "dropdown":
          case "radio":
          case "multiselect":
            if (field.id === field_id) {
              return {
                ...field,
                options: field.options.filter(
                  (existing_option: string) => existing_option !== option
                ),
              };
            } else {
              return field;
            }
          default:
            return field;
        }
      }),
    });
  };

  const getNewField = (kind: fieldKind, fieldLabel: string) => {
    const field_id: number = Number(new Date());
    switch (kind) {
      case "text":
        return {
          kind: kind,
          id: field_id,
          label: fieldLabel,
          fieldType: "text",
          value: "",
        };

      case "textarea":
        return {
          kind: kind,
          id: field_id,
          label: fieldLabel,
          value: "",
        };

      case "dropdown":
        return {
          kind: kind,
          id: field_id,
          label: fieldLabel,
          options: [],
          value: "",
        };

      case "radio":
        return {
          kind: kind,
          id: field_id,
          label: fieldLabel,
          options: [],
          value: "",
        };

      case "multiselect":
        return {
          id: field_id,
          kind: kind,
          label: fieldLabel,
          options: [],
          value: [],
        };

      default:
        return {
          kind: kind,
          id: field_id,
          label: fieldLabel,
          fieldType: "text",
          value: "",
        };
    }
  };
  // Action Reducer Pattern

  const reducer = (state: formDataType, action: formAction) => {
    switch (action.type) {
      case "add_field":
        const newFieldAdd = getNewField(action.kind, action.label);
        action.callback();
        return {
          ...state,
          hash: Number(new Date()),
          formFields: [...state.formFields, newFieldAdd],
        };
      case "remove_field":
        return {
          ...state,
          hash: Number(new Date()),
          formFields: state.formFields.filter(
            (field: formFieldType) => field.id !== action.id
          ),
        };
      case "update_title":
        return {
          ...state,
          hash: Number(new Date()),
          title: action.title,
        };
      case "add_option":
        return {
          ...state,
          hash: Number(new Date()),
          formFields: state.formFields.map((field: formFieldType) => {
            switch (field.kind) {
              case "dropdown":
              case "radio":
              case "multiselect":
                if (
                  field.id === action.id &&
                  !field.options.includes(action.option)
                ) {
                  return {
                    ...field,
                    options: [...field.options, action.option],
                  };
                } else {
                  return field;
                }

              default:
                return field;
            }
          }),
        };
      case "remove_option":
        return {
          ...state,
          hash: Number(new Date()),
          formFields: formState.formFields.map((field: formFieldType) => {
            switch (field.kind) {
              case "dropdown":
              case "radio":
              case "multiselect":
                if (field.id === action.field_id) {
                  return {
                    ...field,
                    options: field.options.filter(
                      (existing_option: string) =>
                        existing_option !== action.option
                    ),
                  };
                } else {
                  return field;
                }
              default:
                return field;
            }
          }),
        };
      case "update_label":
        return {
          ...state,
          hash: Number(new Date()),
          formFields: state.formFields.map((field) => {
            if (field.id === action.id) {
              return {
                ...field,
                label: action.updatedLabel,
              };
            }

            return field;
          }),
        };
      case "remove_label":
        return {
          ...state,
          hash: Number(new Date()),
          formFields: state.formFields.filter((field) => {
            return field.id !== action.id;
          }),
        };

      default:
        return state;
    }
  };

  const dispatchAction = (action: formAction) => {
    setFormState(reducer(formState, action));
  };

  return (
    <AppContainer>
      <Header title="" />
      <div className="m-6 flex flex-col justify-center p-5 align-middle">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="divide-black-500 flex divide-y-8">
            <input
              type="text"
              className="my-2 h-14 w-14 flex-1 items-center border-0 p-2 text-center text-4xl hover:border-b-2 hover:border-b-sky-500 focus:border-b-2 focus:border-b-sky-500 focus:outline-none focus:ring-0"
              value={formState.title}
              onChange={(e) => {
                // setTitle(props.formId, e.target.value);
                dispatchAction({ type: "update_title", title: e.target.value });
              }}
              placeholder="Enter form name..."
              id="formTitle"
            ></input>
          </div>
          <br />
          {formState.formFields.map((field) => {
            switch (field.kind) {
              case "text":
                return (
                  <LabelText
                    id={field.id}
                    key={field.id}
                    label={field.label}
                    fieldType={field.fieldType}
                    removeLabelCB={(fieldId: number) => {
                      dispatchAction({
                        type: "remove_label",
                        id: fieldId,
                      });
                    }}
                    value={field.value}
                    updateLabelCB={(label_value: string, id: number) => {
                      dispatchAction({
                        type: "update_label",
                        id: id,
                        updatedLabel: label_value,
                      });
                    }}
                  />
                );

              case "dropdown":
                return (
                  <LabelSelect
                    key={field.id}
                    id={field.id}
                    parent_id={props.formId}
                    label={field.label}
                    value={field.value}
                    options={field.options}
                    removeLabelCB={(fieldId: number) => {
                      dispatchAction({
                        type: "remove_label",
                        id: fieldId,
                      });
                    }}
                    updateLabelCB={(label_value: string, id: number) => {
                      dispatchAction({
                        type: "update_label",
                        id: id,
                        updatedLabel: label_value,
                      });
                    }}
                    formState={formState}
                    setFormStateCB={setFormState}
                    addOptionCB={(option: string, id: number) => {
                      dispatchAction({
                        type: "add_option",
                        option,
                        id,
                      });
                    }}
                    removeOptionCB={(option: string, id: number) => {
                      dispatchAction({
                        type: "remove_option",
                        option: option,
                        field_id: id,
                      });
                    }}
                  />
                );

              case "radio":
                return (
                  <LabelRadio
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    options={field.options}
                    parent_id={props.formId}
                    removeLabelCB={(fieldId: number) => {
                      dispatchAction({
                        type: "remove_label",
                        id: fieldId,
                      });
                    }}
                    value={field.value}
                    updateLabelCB={(label_value: string, id: number) => {
                      dispatchAction({
                        type: "update_label",
                        id: id,
                        updatedLabel: label_value,
                      });
                    }}
                    formState={formState}
                    setFormStateCB={setFormState}
                    addOptionCB={addOption}
                    removeOptionCB={removeOption}
                  />
                );

              case "multiselect":
                return (
                  <LabelMultiselect
                    key={field.id}
                    id={field.id}
                    parent_id={props.formId}
                    label={field.label}
                    options={field.options}
                    removeLabelCB={(fieldId: number) => {
                      dispatchAction({
                        type: "remove_label",
                        id: fieldId,
                      });
                    }}
                    value={field.value}
                    updateLabelCB={(label_value: string, id: number) => {
                      dispatchAction({
                        type: "update_label",
                        id: id,
                        updatedLabel: label_value,
                      });
                    }}
                    formState={formState}
                    setFormStateCB={setFormState}
                    addOptionCB={addOption}
                    removeOptionCB={removeOption}
                  />
                );
              // return <LabelMultiselect />

              case "textarea":
                return (
                  <LabelTextarea
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    removeLabelCB={(fieldId: number) => {
                      dispatchAction({
                        type: "remove_label",
                        id: fieldId,
                      });
                    }}
                    value={field.value}
                    updateLabelCB={(label_value: string, id: number) => {
                      dispatchAction({
                        type: "update_label",
                        id: id,
                        updatedLabel: label_value,
                      });
                    }}
                  />
                );
              default:
                return <div>Invalid Field</div>;
            }
          })}
          <div className="flex gap-6">
            <Link href="/">
              <div
                className="my-4 rounded-md bg-sky-500 py-2 px-4 font-bold text-white hover:bg-sky-700"
                onClick={(_) => saveForm(formState)}
              >
                Close Form
              </div>{" "}
            </Link>
            <div
              onClick={clearLabels}
              className="btn my-4 rounded-md bg-sky-500 py-2 px-4 font-bold text-white hover:cursor-pointer hover:bg-sky-700"
            >
              Clear Labels
            </div>
            <div
              onClick={(_) => {
                saveForm(formState);
              }}
              className="btn my-4 rounded-md bg-sky-500 py-2 px-4 font-bold text-white hover:cursor-pointer hover:bg-sky-700"
            >
              Save Form
            </div>
          </div>
        </form>
        <div className="grid md:grid-cols-2 lg:grid-cols-5">
          <input
            type="text"
            className="my-3 flex-1 rounded-md border-2 border-gray-200 p-2"
            placeholder="Enter new field name..."
            id="addTextFieldInput"
            value={newField}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              // console.log(e.target.value);
              dispatchNewFieldAction({
                type: "change_text",
                value: e.target.value,
              });
            }}
          />
          <select
            id="fieldOptions"
            name="fieldOptions"
            className="mx-5 my-3 rounded-md px-3"
          >
            <optgroup label="Textual">
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
              <option value="date">Date</option>
              <option value="time">Time</option>
              <option value="url">URL</option>
            </optgroup>
            <optgroup label="Numeric">
              <option value="number">Number</option>
              <option value="tel">Phone Number</option>
              <option value="range">Range</option>
            </optgroup>
            <optgroup></optgroup>
          </select>
          <div
            onClick={(_) => {
              dispatchAction({
                type: "add_field",
                kind: "text",
                label: newField,
                callback: () => {
                  dispatchNewFieldAction({ type: "clear_text" });
                },
              });
            }}
            className="btn m-4 cursor-pointer rounded-lg bg-white py-2 px-4 text-2xl font-bold text-green-500 shadow-lg hover:bg-green-500 hover:text-white"
          >
            Text +
          </div>
          <div
            onClick={(_) => {
              // addDropdownField(document.getElementById("fieldOptions")?.value);
              dispatchAction({
                type: "add_field",
                kind: "dropdown",
                label: newField,
                callback: () => {
                  dispatchNewFieldAction({ type: "clear_text" });
                },
                // fieldType: "text",
              });
            }}
            className="btn m-4 cursor-pointer rounded-lg bg-white py-2 px-4 text-2xl font-bold text-purple-500 shadow-lg hover:bg-purple-500 hover:text-white"
          >
            Dropdown +
          </div>
          <div
            onClick={(_) => {
              dispatchAction({
                type: "add_field",
                kind: "radio",
                label: newField,
                callback: () => {
                  dispatchNewFieldAction({ type: "clear_text" });
                },
                // fieldType: "text",
              });
            }}
            className="btn m-4 cursor-pointer rounded-lg bg-white py-2 px-4 text-2xl font-bold text-orange-500 shadow-lg hover:bg-orange-500 hover:text-white"
          >
            Radio +
          </div>
          <div
            onClick={(_) => {
              dispatchAction({
                type: "add_field",
                kind: "multiselect",
                label: newField,
                callback: () => {
                  dispatchNewFieldAction({ type: "clear_text" });
                },
              });
            }}
            className="btn m-4 cursor-pointer rounded-lg bg-white py-2 px-4 text-2xl font-bold text-teal-500 shadow-lg hover:bg-teal-500 hover:text-white"
          >
            Multiselect +
          </div>
          <div className="my-2 mx-6 flex-1 items-center py-2 px-6">
            <label htmlFor="autoSave" className="my-3 px-2 py-3">
              Autosave?
            </label>
            <input
              type="checkbox"
              name="autosave"
              id="autoSave"
              className="my-3 px-2 py-3"
              defaultChecked={autoSaveState}
              onClick={(_) => {
                switchAutoSave();
              }}
            ></input>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}
