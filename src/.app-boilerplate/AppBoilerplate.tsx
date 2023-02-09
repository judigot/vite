import React from "react";

import styled from "styled-components";

import Data from "./utils/getData";

const H1Styled = styled.h1`
  color: blue;
`;

interface Props {}

export default function App(props: Props) {
  const [initialData, setInitialData] = React.useState<string>();

  React.useEffect(() => {
    // Initial render
    if (!initialData) {
      getData();
    }

    async function getData() {
      Data()
        .then((result) => {
          // Success
          setInitialData(result);
        })
        .catch((error) => {
          // Failure
        })
        .finally(() => {
          // Finally
        });
    }
  }, []);

  return (
    <>
      <H1Styled>Styled Component</H1Styled>
      <span>Initial Data:</span>
      <p>{JSON.stringify(initialData)}</p>
      <button onClick={handleClick}>DDDDDDDDDDDDDDD</button>
    </>
  );
}
//====================HELPER FUNCTIONS====================//
// Function expression syntax to save memory
const handleClick = () => {
  alert("dddddddddddd");
};
//====================HELPER FUNCTIONS====================//
