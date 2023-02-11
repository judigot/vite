import React from "react";

interface Props {
  index: number;
}

export default function App(props: Props) {
  React.useEffect(() => {}, []);

  //====================HELPER FUNCTIONS====================//
  // Function expression syntax to save memory
  //====================HELPER FUNCTIONS====================//

  return <div>Child {props.index}</div>;
}
