import React from "react";

import Data from "./helpers/Data";

import { Layouts, Modals } from "./components";

//==========STYLE==========//
import "./styles/main.scss";
import styled from "styled-components";
const H1Styled = styled.h1`
  color: blue;
`;
//==========STYLE==========//

interface Props {
  name: string;
  age: string;
  birthday: Date;
  [key: string]: string | number | Date; // For assigning dynamic keys (string)
  [index: number]: string | number | Date; // For assigning dynamic indexes (number)
}

export default function App({}: Props) {
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
      // const response = await Data();
      // const data = await response.json();
      // setInitialData(data);

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

  React.useEffect(() => {
    // Runs after every successful render or state change
  });

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
          return (
            <Layouts.Child key={i} name={"Firstname Lastname"} index={i + 1} />
          );
        })}
      </div>
    </>
  );
}
