import React from "react";

import { ParentComponent } from "./components/ParentComponent";

interface Props {}

export default function App(props: Props) {
  const [data, setData] = React.useState<string>();

  React.useEffect(() => {
    // Initial render
    if (!data) {
      getData();
    }

    async function getData() {
      setData("Initial Value");
    }
  }, []);

  return (
    <>
      <ParentComponent />
    </>
  );
}
