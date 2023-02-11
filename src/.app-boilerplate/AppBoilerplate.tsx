import React from "react";

import styled from "styled-components";

import { Layouts, Modals } from "./components";
import Data from "./helpers/getData";

const H1Styled = styled.h1`
  color: blue;
`;

interface Props {}

export default function App(props: Props) {
  const [count, setCount] = React.useState<number>(0);
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

  //====================HELPER FUNCTIONS====================//
  // Function expression syntax to save memory
  const handleClick = () => {
    if (count !== 5) {
      setCount(count + 1);
    }
  };
  //====================HELPER FUNCTIONS====================//

  return (
    <>
      <H1Styled>Styled Functional Component</H1Styled>
      <span>Initial Data:</span>
      <p>{JSON.stringify(initialData)}</p>
      <button onClick={handleClick}>You've clicked {count} times.</button>

      <Modals.Bootstrap />

      <div>
        {[...Array(count)].map((element, i) => {
          return <Layouts.Child key={i} index={i + 1} />;
        })}
      </div>
    </>
  );
}
