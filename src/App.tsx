import "./scss/main.scss";

import styled from "styled-components";

import { ParentComponent } from "./app-cheatsheet/components/ParentComponent";
import Dependencies from "./components/Dependencies";

const H1Styled = styled.h1`
  color: blue;
`;

function App() {
  return (
    <div className="App">
      <H1Styled>Styled Component</H1Styled>
      <ParentComponent />
      <Dependencies />
    </div>
  );
}

export default App;
