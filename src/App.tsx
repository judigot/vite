import { useState, useMemo, useEffect } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { BsPlusCircleFill } from "react-icons/bs";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import "./App.css";

interface Employee {
  id?: number;
  emp_name?: string;
  emp_desc?: string;
  dept_id?: number;
  active?: boolean;
}

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

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    alert("reload");
    setEmployees(data);
  }, [data]);

  const [rows, setRows] = useState<[Employee]>([{}]);

  if (isLoading)
    return (
      <>
        <h1>Loading</h1>
      </>
    );

  const columns = [
    {
      name: "Employee Name",
      sortable: true,
      selector: (row: { [key: string]: string }) => row.emp_name,
    },
    {
      name: "Description",
      sortable: true,
      selector: (row: { [key: string]: string }) => row.emp_desc,
    },
    {
      name: "Status",
      sortable: true,
      selector: (row: { [key: string]: string }) => row.active,
      format: (row: { [key: string]: string }) =>
        row.active ? "Active" : "Inactive",
    },
  ];

  const handleSelectedRows = (rows: any) => {
    setRows(rows.selectedRows);
  };

  const contextActions = () => {
    const handleEdit = () => {
      alert(JSON.stringify(rows));
    };
    const handleDelete = () => {
      if (
        window.confirm(`Are you sure you want to delete the selected row/s?`)
      ) {
        deleteRow(rows);
      }
    };
    return (
      <>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </>
    );
  };

  return (
    <>
      <DataTable
        title="Employee List"
        columns={columns}
        data={employees}
        pagination
        selectableRows
        contextActions={contextActions()}
        onSelectedRowsChange={handleSelectedRows}
      />
      {/* {data &&
        data.map((row: { [key: string]: string }, i: number) => {
          return <div key={i}>{row?.emp_name}</div>;
        })} */}
    </>
  );
};

const create = () => {
  const data: { [key: string]: string | number } = {
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

const deleteRow = async (rows: [Employee]) => {
  const data = rows.map((item) => item.id);

  fetch(`http://localhost:5000/employees/${data[0]}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // For POST requests only
  })
    .then((response) => response.json())
    .then((result) => {})
    .catch((error) => {
      alert(error);
    });
};

export default App;
