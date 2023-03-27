import React from "react";

import { ParentComponent } from "./components/ParentComponent";

interface Props {
  // For assigning dynamic keys (string)
  [key: string]: string | number | Date | undefined;

  // For assigning dynamic indexes (number)
  [index: number]: string | number | Date | undefined;
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
