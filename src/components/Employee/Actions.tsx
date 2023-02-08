import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";

import styled from "styled-components";
const ActionsWrapper = styled.div`
  font-size: 50px;
`;

const Actions = () => {
  return (
    <ActionsWrapper>
      <BsPlusCircleFill />
    </ActionsWrapper>
  );
};

export default Actions;
