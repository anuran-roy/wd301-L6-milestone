import { useRoutes } from "raviger";
import { useState } from "react";

import Home from "../components/Home";
import Header from "../components/Header";
import About from "../components/About";
import App from "../App";
import Form from "../components/Form";
import Preview from "../components/Preview";

export default function AppRouter() {
  const [state, setState] = useState("HOME");

  const openForm = () => {
    setState("FORM");
  };

  const closeForm = () => {
    setState("HOME");
  };

  const routes = {
    "/": () => <App />, // <Header title="Hello World!" />,
    "/about": () => <About />,
    "/form/:id": ({ id }: { id: string }) => <Form formId={Number(id)} />,
    "/preview/:id": ({ id }: { id: string }) => <Preview formId={Number(id)} />,
  };

  const routeResult = useRoutes(routes);
  return routeResult;
}
