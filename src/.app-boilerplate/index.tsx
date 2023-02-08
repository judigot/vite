import React from "react";

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
      <h1>Component</h1>
      <p>{data}</p>
    </>
  );
}
