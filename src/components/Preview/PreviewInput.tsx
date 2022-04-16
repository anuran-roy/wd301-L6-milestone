import React, { useState, useEffect } from "react";

export function TextFieldInput(props: {
  id: number;
  label: string;
  fieldType: string;
  value: string;
  updateTextInputCB: (e: string, id: number) => void;
}) {
  return (
    <>
      <label>{props.label}:</label>
      <div className="flex">
        <input
          id={`${props.id}`}
          className="my-2 flex-1 rounded-lg border-2 border-gray-200 p-2"
          type={props.fieldType}
          autoComplete="true"
          value={props.value}
          onChange={(e: any) => {
            console.log(e.target.value);
            props.updateTextInputCB(e.target.value, props.id);
          }}
        />
      </div>
    </>
  );
}

export function DropdownFieldInput(props: {
  id: number;
  label: string;
  options: string[];
  value: string;
  updateDropdownCB: (e_value: string, dropdownId: number) => void;
  // removeDropdownCB: (id: number) => void
}) {
  return (
    <>
      <label htmlFor={`${props.id}`}>{props.label}:</label>
      <div className="my-3 mx-2 flex py-3" id={`${props.id}`}>
        <select
          className="mx-3 rounded-lg py-3 px-2"
          value={props.value}
          onChange={(e: any) => {
            props.updateDropdownCB(e.target.value, props.id);
          }}
        >
          <option>Select an Option</option>
          {props.options.map((dropdownOption: string, optionIndex: number) => (
            <option value={dropdownOption} key={optionIndex}>
              {dropdownOption}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export function RadioFieldInput(props: {
  id: number;
  label: string;
  options: string[];
  value: string;
  // updateDropdownCB: (e_value: string, dropdownId: number) => void,
  updateRadioCB: (e_value: string, id: number) => void;
  // removeRadioCB: (id: number) => void
}) {
  return (
    <>
      <label key={`label-${props.id}`}>{props.label}</label>
      <div
        className="grid grid-cols-2 justify-center gap-2 py-3"
        key={`div-${props.id}`}
      >
        <ul>
          {/* <option>Select an Option</option> */}
          {props.options.map((radioOption: string, optionIndex: number) => (
            <li
              key={`radio-${props.id}-element-${optionIndex}`}
              className="my-2 cursor-pointer text-lg"
            >
              <label htmlFor={`${optionIndex}`} key={`label-${optionIndex}`}>
                {radioOption}
              </label>
              <input
                type="radio"
                key={`${props.id}-${optionIndex}`}
                id={`${optionIndex}`}
                name={`radio-${props.id}`}
                className="mx-3 py-3 px-2"
                checked={radioOption === props.value}
                onChange={(e: any) => {
                  props.updateRadioCB(radioOption, props.id);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export function MultiselectFieldInput(props: {
  id: number;
  label: string;
  options: string[];
  value: string[];
  updateMultiselectCB: (e_value: string[], id: number) => void;
  // removeLabelCB: (id: number) => void
}) {
  const [chosenOptions, setChosenOptions] = useState(props.value);

  const isSelected = (option: string) => {
    return chosenOptions.includes(option);
  };

  const selectOption = (option: string) => {
    setChosenOptions([...chosenOptions, option]);
  };

  const unselectOption = (option: string) => {
    setChosenOptions(
      chosenOptions.filter((existing_option) => existing_option !== option)
    );
  };

  const renderIfSelected = (option: string) => {
    if (isSelected(option)) {
      return <div className="text-gray-500 hover:text-white">selected</div>;
    }
  };
  const toggleSelection = (option: string) => {
    if (isSelected(option)) {
      unselectOption(option);
    } else {
      selectOption(option);
    }
  };

  const showSelected = () => {
    if (chosenOptions.length === 0) {
      return "Select Options ⌄";
    } else {
      return `Selected Options: ${chosenOptions} ⌄`;
    }
  };
  useEffect(() => {
    props.updateMultiselectCB(chosenOptions, props.id);
  }, [chosenOptions]);

  return (
    <>
      <label htmlFor={`multiselect-${props.id}`}>{props.label}:</label>
      {/* <button id="dropdownDefault" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> */}
      {/* <!-- Dropdown menu --> */}
      <div
        className="btn m-3 cursor-pointer rounded-md border-2 p-2 text-center shadow-lg hover:bg-teal-500 hover:text-white hover:shadow-none md:w-48 lg:w-80"
        onClick={(_) => {
          const value = document.getElementById(`${props.id}-dropdownOptions`);
          if (value) {
            value.classList.toggle("hidden");
          }
        }}
      >
        {showSelected()}{" "}
      </div>
      <div
        id={`${props.id}-dropdownOptions`}
        className="z-10 hidden w-96 divide-y divide-gray-100 rounded bg-white shadow-lg"
      >
        {/* <ul
            key={props.id}
            id={`multiselect-${props.id}`}
            className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault"> */}
        <ul
          className="mx-3 py-3 px-2"
          // multiple={true}
          // size={1}// {props.options.length}
          // defaultChecked
        >
          {/* <option>Select an Option</option> */}
          {props.options.map((dropdownOption: string, optionIndex: number) => {
            // console.log(dropdownOption);
            return (
              <li
                className="my-2 cursor-pointer p-2 hover:rounded-md hover:bg-teal-500 hover:text-white"
                value={dropdownOption}
                key={optionIndex}
                onClick={(_) => {
                  // console.log(dropdownOption);
                  props.updateMultiselectCB([dropdownOption], props.id);
                  toggleSelection(dropdownOption);
                }}
              >
                {dropdownOption} {renderIfSelected(dropdownOption)}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export function TextAreaInput(props: {
  id: number;
  label: string;
  value: string;
  updateTextAreaCB: (e_value: string, id: number) => void;
}) {
  return (
    <>
      <label htmlFor={`${props.id}`}>{props.label}:</label>
      <br />
      <div className="my-3 py-3 px-2">
        <textarea
          id={`${props.id}`}
          className="my-3 border-2 py-3 px-2 text-gray-700 focus:text-gray-900"
          value={props.value}
          onChange={(e: any) => {
            props.updateTextAreaCB(e.target.value, props.id);
          }}
        ></textarea>
      </div>
    </>
  );
}
