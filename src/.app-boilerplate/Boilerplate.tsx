import React from "react";

interface Props {
  name: string;
  age?: number;
}

const Boilerplate = ({ name, age }: Props) => {
  const [state, setState] = React.useState<string>("");

  React.useEffect(() => {
    // Initial render

    // Cleanup function
    return () => {
      // Remove event listeners, setIntervals, setTimeout, etc.
    };
  }, []);

  return (
    <div>
      <p>Name: {name}</p>
      {age && <p>Age: {age}</p>}
    </div>
  );
};

Boilerplate.defaultProps = {
  age: 18,
};

export default Boilerplate;
