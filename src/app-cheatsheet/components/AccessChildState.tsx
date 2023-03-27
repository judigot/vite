import React from "react";

interface Props {
  // For assigning dynamic keys (string)
  [key: string]: string | number | Date | undefined;

  // For assigning dynamic indexes (number)
  [index: number]: string | number | Date | undefined;
}

export default ({}: Props) => {
  const childRef = React.useRef<{ [key: string]: Function }>();
  return (
    <>
      <h2>
        Access child component refs/state from the parent component; Expose
        child component state; Expose child component refs
      </h2>
      <h2>Parent</h2>

      <button
        onClick={() => {
          alert(
            "Child component state: \n" +
              JSON.stringify(childRef.current!.getNumber(), null, 2)
          );
        }}
      >
        Access child component state/refs
      </button>

      <h2>Children</h2>

      {React.forwardRef((props, ref) => {
        return <Child ref={childRef} />;
      })}
    </>
  );
}

const Child = React.forwardRef((props, ref) => {
  const [number, setNumber] = React.useState<number>(100);

  // Getters; Expose child's state
  React.useImperativeHandle(ref, () => ({
    getNumber: () => {
      return { number };
    },
  }));

  return (
    <div>
      Child component state: {number}
      <button
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        Modify this child's state
      </button>
    </div>
  );
});
