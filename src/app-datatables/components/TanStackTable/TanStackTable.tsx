import React from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

const defaultData = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
  },
];

const columnHelper = createColumnHelper<Person>();
// const columnHelper = createColumnHelper<typeof defaultData[0]>();

const columns = [
  columnHelper.accessor((row) => row.firstName, {
    id: "First Name",
    header: (info) => {
      return <i>{info.column.id}</i>;
    },
    cell: (info) => {
      const cellData = info.getValue();
      return <span>{cellData}</span>;
    },
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "Last Name",
    header: (info) => {
      return <span>{info.column.id}</span>;
    },
    cell: (info) => {
      const cellData = info.getValue();
      return <span>{cellData}</span>;
    },
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.age, {
    id: "Age",
    header: (info) => {
      return <span>{info.column.id}</span>;
    },
    cell: (info) => {
      const cellData = info.getValue();
      return <span>{cellData}</span>;
    },
    // footer: (info) => info.column.id,
  }),
];

export default function App() {
  const [data, setData] = React.useState(() => [...defaultData]);

  const rerender = React.useReducer(() => ({}), {})[1];

  const fetchData = () => {
    const newData = [
      {
        firstName: "Jude Francis",
        lastName: "Igot",
        age: 25,
      },
    ];
    setData([...newData]);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const query = React.useRef<HTMLInputElement>(null!);

  function filterRows() {
    const queryVal: string = query.current.value;
    var filter, table, tr, td, i, txtValue;
    filter = queryVal.toUpperCase();
    table = document.getElementById("myTable");
    tr = table!.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      // txtValue = tr[i].innerHTML.toUpperCase();
      txtValue = tr[i].textContent || tr[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }

  return (
    <div className="p-2">
      <input
        ref={query}
        type="text"
        id="myInput"
        onKeyUpCapture={filterRows}
        placeholder="Search for names.."
        title="Type in a name"
      ></input>

      <button onClick={fetchData}>Fetch Data</button>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody id="myTable">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
