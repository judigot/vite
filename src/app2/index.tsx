import React from "react";

function App2() {
  const [data, setData] = React.useState<string>();

  React.useEffect(() => {
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

export default App2;
