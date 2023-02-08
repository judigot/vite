import React, { useEffect } from "react";

interface Person {
  id?: number;
  firstName?: string;
  lastName?: string; // ? means optional
  parentFunction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  changeParentState?: any;
  readonly type?: string; // Value cannot be changed once declared
}

const student: Person = {
  id: 13105179,
  firstName: "Jude Francis",
  lastName: "Igot",
  type: "human",
};

student.id = 1; // Can be changed
// student["type"] = "alien"; // Readonly. Can't be changed

export const ChildComponent = (props: Person) => {
  useEffect(() => {
    console.log("Initial code: child");
  }, []);

  return (
    <>
      <div>{props.id}</div>
      <div>{props.firstName}</div>
      <button onClick={props.parentFunction}>
        Execute parent component's function from its child component
      </button>

      <button
        onClick={() => {
          props.changeParentState("Changed parent state");
        }}
      >
        Click here to change a parent's state
      </button>
    </>
  );
};
