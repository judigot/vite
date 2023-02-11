import React from "react";

import Data from "./helpers/getData";

import { Layouts, Modals } from "./components";

//==========STYLE==========//
import "./styles/main.scss";
import styled from "styled-components";
const H1Styled = styled.h1`
  color: blue;
`;
//==========STYLE==========//

interface Props {}

export default function App(props: Props) {
  // const [count, setCount] = React.useState<number>(0);

  const [number, setNumber] = React.useState<number>(expensiveCalculation);

  const [initialData, setInitialData] = React.useState<string>();

  function expensiveCalculation(): number {
    console.log("Calculating...");
    for (let i = 0; i < 3000000000; i++) {}
    console.log("Done calculating!");
    return 0;
  }

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
    if (number !== 5) {
      setNumber(number + 1);
    }
  };
  //====================HELPER FUNCTIONS====================//

  return (
    <>
      <H1Styled>Styled Functional Component</H1Styled>
      <h5>Initial Data:</h5>
      <p>{JSON.stringify(initialData)}</p>
      <button onClick={handleClick}>You've clicked {number} times.</button>

      <div>
        {[...Array(number)].map((element, i) => {
          return <Layouts.Child key={i} index={i + 1} />;
        })}
      </div>
    </>
  );
}
