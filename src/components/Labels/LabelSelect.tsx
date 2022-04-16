import React, { useState, useEffect } from "react";
import { formFieldType } from "../../types/formTypes";
import getForms from "../../functions/getForms";
import saveForms from "../../functions/saveForms";
import formDataType from "../../types/formDataType";

export function LabelSelect(props: {
  id: number;
  // kind: "dropdown",
  parent_id: number;
  label: string;
  options: string[];
  value: string;
  // kind: fieldKind;
  formState: formDataType;
  setFormStateCB: (formState: formDataType) => void;
  updateLabelCB: (target_value: string, id: number) => void;
  removeLabelCB: (id: number) => void;
  addOptionCB: (target_value: string, id: number) => void;
  removeOptionCB: (target_value: string, id: number) => void;
}) {
  //   console.log(`Rerendering field with id ${props.id} on form ${props.parent_id}`);

  const [optionsState, setOptionsState] = useState(props.options);
  const [newOptionState, setNewOptionState] = useState("");

  const addSelectOption = (option: string) => {
    if (option.length === 0) {
      alert("Can't add a field with empty name!");
    } else if (!optionsState.includes(option)) {
      setOptionsState([...optionsState, option]);
    }

    setNewOptionState("");
  };

  const removeSelectOption = (option: string) => {
    if (optionsState.includes(option)) {
      setOptionsState(
        optionsState.filter((existing_option) => existing_option !== option)
      );
    }
  };

  return (
    <>
      <div className="flex rounded-md shadow-md hover:shadow-lg" draggable>
        <div className="w-8 cursor-grabbing bg-sky-500 opacity-50 hover:opacity-100"></div>
        <input
          className="mx-2 my-2 flex-1 border-0 p-2 text-lg hover:border-b-2 hover:border-b-sky-500 focus:border-b-2 focus:border-b-sky-500 focus:outline-none focus:ring-0"
          id={`label-${props.id}`}
          type="text"
          placeholder="Enter field label"
          value={props.label}
          onChange={(e: any) => {
            props.updateLabelCB(e.target.value, props.id);
          }}
        ></input>
        <div className="my-5 mx-3">
          {/* Options: {"[" + optionsState + "]"}
            {const id=`addNewOption-${props.options.length+2}`;} */}
          <br />
          <div className="flex">
            <input
              className="my-2 mx-2 rounded-md border-0 bg-gray-100 px-2 text-gray-700 hover:text-gray-900 focus:text-gray-900"
              type="text"
              placeholder="Enter option name..."
              id={`addNewOption-${props.options.length + 2}`}
              value={newOptionState}
              onChange={(e) => setNewOptionState(e.target.value)}
            ></input>
            <div
              className="button m-2 flex cursor-pointer items-center rounded-md bg-sky-500 p-2 font-bold text-white hover:bg-sky-700"
              onClick={(_) => {
                addSelectOption(newOptionState);
                props.addOptionCB(newOptionState, props.id);
              }}
            >
              Add
            </div>
          </div>
          <strong>Option</strong>:
          <ul className="list-disc">
            {optionsState.map((existingOption: string, optionIndex: number) => {
              return (
                <li className="flex cursor-text" key={optionIndex}>
                  <div className="py-3">{existingOption}</div>
                  <div
                    className="button m-2 flex cursor-pointer items-center rounded-md bg-red-500 p-2 font-bold text-white hover:bg-red-700"
                    onClick={(_) => {
                      props.removeOptionCB(existingOption, props.id);
                      removeSelectOption(existingOption);
                    }}
                  >
                    ✖
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <p id={`options-${props.id}`}></p>
        <div
          onClick={(_) => props.removeLabelCB(props.id)}
          className="btn m-4 flex cursor-pointer items-center rounded-lg bg-white py-2 px-4 font-bold text-red-500 shadow-md hover:bg-red-500 hover:text-white hover:shadow-lg"
        >
          ✖
        </div>
      </div>
    </>
  );
}
