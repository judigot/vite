import React from "react";

import styled from "styled-components";

const ClickableStyled = styled.div`
  font-size: 20px;
  cursor: pointer;
  background-color: skyblue;
  padding: 10px;
  border-radius: 10px;
`;

interface Props {
  item: string | number;
  behavior: Function;
}

export const Clickable = ({ item, behavior }: Props) => {
  return (
    <ClickableStyled
      onClick={() => {
        behavior(item);
      }}
    >
      {item}
    </ClickableStyled>
  );
};
export default Clickable;
