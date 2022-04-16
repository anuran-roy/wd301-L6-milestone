import React from "react";
// import logo from "../logo.svg";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center overflow-auto bg-gray-100">
      <div className="m-4 mx-auto w-full max-w-6xl rounded-xl bg-white p-4 shadow-lg">
        {props.children}
      </div>
    </div>
  );
}
