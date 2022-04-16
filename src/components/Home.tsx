import { useState } from "react";
import { useQueryParams, navigate, Link } from "raviger";

// import logo from "../logo.svg";
import getForms from "../functions/getForms";
import saveForms from "../functions/saveForms";

import formDataType from "../types/formDataType";
import initialFormFields from "../presets/initialFormFields";

import Header from "./Header";

export default function Home() {
  const localForms = getForms();
  const [listState, setListState] = useState(localForms);

  // Search
  const [{ search }, setQueryParams] = useQueryParams();
  const [searchString, setSearchString] = useState("");

  const newForm = () => {
    const createdForm: formDataType = {
      created_on: new Date().toString(),
      hash: Number(new Date()),
      id: Number(new Date()),
      title: "Untitled Form",
      formFields: initialFormFields,
    };
    setListState([...listState, createdForm]);
    saveForms([...listState, createdForm]);
    // <Redirect to={`/form/${createdForm.id}`} />

    // Simulate an HTTP redirect:
    navigate(`/form/${createdForm.id}`);
  };

  const deleteForm = (formId: number) => {
    saveForms(listState.filter((form) => form.id !== formId));
    setListState(listState.filter((form) => form.id !== formId));
  };
  return (
    <>
      <Header title="Home" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQueryParams({ search: searchString });
        }}
      >
        <input
          type="text"
          className="my-2 w-96 flex-1 border-0 p-2 text-4xl hover:border-b-2 hover:border-b-sky-500 focus:border-b-2 focus:border-b-sky-500 focus:outline-none focus:ring-0"
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
          placeholder="Enter search string..."
          name="search"
          id="searchTField"
          tabIndex={0}
        ></input>
      </form>
      <div className="flex">
        <div className="flex-1 items-center justify-center">
          {/* <p>Welcome to the Home Page</p> */}
          <button
            onClick={newForm}
            className="m-2 rounded-md p-2 text-sky-500 shadow-xl hover:bg-sky-700 hover:text-white"
          >
            New Form
          </button>
        </div>
      </div>
      <ul className="grid md:grid-cols-1 lg:grid-cols-2">
        {listState
          .filter((form) =>
            form.title.toLowerCase().includes(search?.toLowerCase() || "")
          )
          .map((form) => {
            return (
              <li
                className="m-5 block max-w-md rounded-lg bg-white p-5 text-gray-700 shadow-xl"
                key={form.id}
              >
                <p className="m-2 flex justify-center text-2xl">{form.title}</p>
                <p>
                  <strong>Created on: </strong>
                  {form.created_on}
                </p>
                <p>
                  <strong>Fields: </strong>
                  {form.formFields.length}
                </p>
                <Link
                  href={`/preview/${form.id}`}
                  className="m-2 rounded-md bg-sky-500 p-2 font-bold text-white shadow-lg hover:bg-sky-700"
                >
                  Preview Form
                </Link>
                <Link href={`/form/${form.id}`}>
                  <button className="m-2 rounded-md bg-green-500 p-2 text-white shadow-lg hover:bg-green-700">
                    Edit Form
                  </button>
                </Link>
                <button
                  className="m-2 rounded-md bg-red-500 p-2 text-white shadow-lg hover:bg-red-700"
                  onClick={(_) => {
                    deleteForm(form.id);
                  }}
                >
                  Delete Form
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
}
