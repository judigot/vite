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
  name?: string;
  age?: string;
  birthday?: Date;
  // For assigning dynamic keys (string)
  [key: string]: string | number | Date | undefined;

  // For assigning dynamic indexes (number)
  [index: number]: string | number | Date | undefined;
}

const initialData: object | undefined = await Data();

export default ({}: Props) => {
  // const [count, setCount] = React.useState<number>(0);

  const [number, setNumber] = React.useState<number>(expensiveCalculation);

  function expensiveCalculation(): number {
    console.log("Calculating...");
    for (let i = 0; i < 3000000000; i++) {}
    console.log("Done calculating!");
    return 0;
  }

  React.useEffect(() => {
    // Runs after every successful render or state change
    console.log("A state was changed.");
  });

  React.useEffect(() => {
    // Prevent running on initial render
    if (number !== 0) {
      console.log("This console log runs after changing number state.");
    }
  }, [number]);

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
};
