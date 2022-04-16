export function LabelTextarea(props: {
  id: number;
  label: string;
  value: string;
  updateLabelCB: (target_value: string, id: number) => void;
  removeLabelCB: (id: number) => void;
}) {
  return (
    <>
      <div className="my-2 flex rounded-md hover:shadow-lg" draggable>
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
        <p className="my-5 mx-3">Input Type: Text Area</p>
        <button
          onClick={(_) => props.removeLabelCB(props.id)}
          className="btn m-4 rounded-lg bg-white py-2 px-4 font-bold text-red-500 shadow-md hover:bg-red-500 hover:text-white hover:shadow-lg"
        >
          ✖
        </button>
      </div>
    </>
  );
}
