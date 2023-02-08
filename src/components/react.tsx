import React from "react";
import ReactDOM from "react-dom/client";
import { ParentComponent } from "./ParentComponent";

export const Component = (elementID: string) => {
  ReactDOM.createRoot(document.getElementById(elementID)!).render(
    <React.StrictMode>
      <ParentComponent />
    </React.StrictMode>
  );
};
