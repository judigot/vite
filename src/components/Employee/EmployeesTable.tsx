import React from "react";
import { useState, useMemo, useEffect } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { BsPlusCircleFill } from "react-icons/bs";
import DataTable from "react-data-table-component";

import styled from "styled-components";

interface Employee {
  id?: number;
  emp_name?: string;
  emp_desc?: string;
  dept_id?: number;
  active?: boolean;
}

const ActionsWrapper = styled.div`
  font-size: 50px;
`;

const EmployeesTable = () => {
  const { isLoading, data, refetch, isFetching } = useQuery("employees", read);

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
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
      // alert(JSON.stringify(rows));
    };
    const handleDelete = () => {
      if (
        window.confirm(`Are you sure you want to delete the selected row/s?`)
      ) {
        deleteRow(rows);
        read();
      } else {
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
  console.log("newdata");
  return await fetch(`http://localhost:5000/employees`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((parameter) => {
      return parameter.filter((employee: any) => {
        // Filter inactive employees
        return employee.active;
      });
    });
};

const deleteRow = async (rows: [Employee]) => {
  rows.map((row) => {
    row.active = false;
    fetch(`http://localhost:5000/employees/${row.id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(row), // For POST requests only
    })
      .then((response) => response.json())
      .then((result) => {
        // alert(JSON.stringify(result));
      })
      .catch((error) => {
        alert(error);
      });
  });
};

export default EmployeesTable;
