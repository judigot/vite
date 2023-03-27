import React from "react";

import { ParentComponent } from "./components/ParentComponent";

interface Props {
  [key: string]: string | number | Date; // For assigning dynamic keys (string)
  [index: number]: string | number | Date; // For assigning dynamic indexes (number)
}

export default ({}: Props) => {
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
