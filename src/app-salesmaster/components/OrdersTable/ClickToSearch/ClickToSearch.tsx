import React from "react";

import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@src/app-salesmaster/store";
import { setQuery } from "@src/app-salesmaster/features/OrderSearchSlice";

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
  item: string;
  forCustomer?: boolean;
  forDate?: boolean;
}
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
export const Clickable = ({ item, forCustomer, forDate }: Props) => {
  const myPromise = (item: string) => {
    return new Promise((resolve, reject) => {
      resolve(dispatch(setQuery(item)));
    });
  };
  const dispatch = useDispatch();
  return (
    <ClickableStyled
      onClick={async () => {
        dispatch(setQuery(item));

        // (
        //   document.querySelector("#searchInput") as unknown as HTMLInputElement
        // ).select();

        setTimeout(() => {
          (
            document.querySelector(
              "#searchInput"
            ) as unknown as HTMLInputElement
          ).select();
        }, 5);
      }}
    >
      {forCustomer && <PersonIcon />}
      {forDate && <CalendarMonthIcon />}
      <div>{item}</div>
    </ClickableStyled>
  );
};
export default Clickable;
