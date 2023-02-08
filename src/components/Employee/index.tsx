import { QueryClient, QueryClientProvider } from "react-query";

import styled from "styled-components";
import "@/styles/App.styled";
import InsertEmployeeForm from "./InsertEmployeeForm";
import Actions from "./Actions";
import EmployeesTable from "./EmployeesTable";

const queryClient = new QueryClient();

const H1Styled = styled.h1`
  color: blue;
`;

const Container = styled.div`
  padding-top: 5%;
  width: 50%;
  margin: auto;
`;

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        {/* <InsertEmployeeForm /> */}
        {/* <Actions /> */}
        <EmployeesTable />
      </Container>
    </QueryClientProvider>
  );
};

export default App;
