import React from "react";

import styled from "styled-components";

const ClickableStyled = styled.div`
  font-family: sans-serif;
  color: white;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  background-color: darkblue;
  padding: 10px;
  border-radius: 10px;

  &:hover {
    box-shadow: 0px 0px 10px 1px #555;
  }
`;

export interface Props {
  item: string | number;
  behavior: Function;
  forCustomer?: boolean;
  forDate?: boolean;
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
