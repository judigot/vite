import React from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Data, { Datatype, columns } from "./TableInfo";

export default function App() {
  const [data, setData] = React.useState<Datatype[]>([]);

  React.useEffect(() => {
    (async () => {
      const data: Datatype[] = await Data();
      setData([...data]);
    })();
  }, []);

  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const query = React.useRef<HTMLInputElement>(null!);

  function filterRows() {
    const searchQuery: string = query.current.value.toUpperCase();

    const rows = document.querySelector("#myTable")!.getElementsByTagName("tr");

    for (let i = 0, arrayLength = rows.length; i < arrayLength; i++) {
      const rowContent = rows[i].textContent || rows[i].innerText;
      if (rowContent.toUpperCase().includes(searchQuery)) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
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
      />
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
          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                Loading
              </td>
            </tr>
          )}
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
