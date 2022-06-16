import { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";

import "./App.css";

const queryClient = new QueryClient();

const H1Styled = styled.h1`
  color: blue;
`;

const Container = styled.div`
  padding-top: 5%;
  width: 50%;
  margin: auto;
`;

const ActionsWrapper = styled.div`
  font-size: 50px;
`;

import { BsPlusCircleFill } from "react-icons/bs";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Actions />
        <Employees />
      </Container>
    </QueryClientProvider>
  );
};

const Actions = () => {
  return (
    <ActionsWrapper>
      <BsPlusCircleFill />
    </ActionsWrapper>
  );
};

const Employees = () => {
  const { isLoading, data, isFetching } = useQuery("employees", read);

  if (isLoading)
    return (
      <>
        <h1>Loading</h1>
      </>
    );

  return (
    <>
      {data &&
        data.map((row: { [key: string]: string }, i: number) => {
          return <div key={i}>{row?.emp_name}</div>;
        })}
    </>
  );
};

const create = () => {
  const data: any = {
    emp_name: "Jude",
    emp_desc: "Coolest guy",
    dept_id: 3,
  };

  fetch(`http://localhost:5000/employees`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // For POST requests only
  })
    .then((response) => response.json())
    .then((result) => {
      alert(JSON.stringify(result));
    })
    .catch((error) => {
      alert(error);
    });
};

const read = async () => {
  return await fetch(`http://localhost:5000/employees`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export default App;
