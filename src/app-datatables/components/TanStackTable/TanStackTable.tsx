import React from "react";

import Data, { Datatype, columns } from "./TableInfo";

import { OrderItems } from "@src/app-salesmaster/components/OrdersTable";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  flexRender,
} from "@tanstack/react-table";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import TextField from "@mui/material/TextField/TextField";

import styled from "styled-components";
const SearchbarContainer = styled.div`
  /* text-align: center; */
  position: relative;
  /* left: 1000px; */
  max-width: 100%;
`;

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, searchInput, addMeta) => {
  const masterValues: string[] = [];
  const rowContent = [];
  for (
    let i = 0, arrayLength = row.getVisibleCells().length;
    i < arrayLength;
    i++
  ) {
    //=======GET COLUMNS=======//
    let targetColumn = undefined;
    // prettier-ignore
    for ( let i = 0, arrayLength = row.getVisibleCells().length; i < arrayLength; i++ ) { const columnName = row.getVisibleCells()[i].column.id; if (columnName === columnId) { targetColumn = i; break; } }
    const columnName = row.getVisibleCells()[targetColumn!].column.id;
    //=======GET COLUMNS=======//

    const rawCellValue = row.getVisibleCells()[i];
    const cellRendererFunction = rawCellValue.column.columnDef.cell as Function;
    const renderedCellValue = cellRendererFunction(rawCellValue);

    // Order ID
    if (columnName === "Order ID") {
      if (typeof renderedCellValue === "number") {
        rowContent.push(`orderID='${renderedCellValue}'`);
      }
    }

    // Customer
    if (columnName === "Customer") {
      if (typeof renderedCellValue === "object") {
        if (renderedCellValue.props.forCustomer === true) {
          rowContent.push(`customerName='${renderedCellValue.props.item}'`);
        }
      }
    }

    // Order Products
    if (typeof renderedCellValue === "object") {
      const value = renderedCellValue.props.items;
      if (typeof value === "object") {
        let totalItems: number = 0;
        let totalAmount: number = 0;
        let totalProfit: number = 0;

        (value as OrderItems[]).map(
          (
            {
              id,
              order_id,
              product_name,
              quantity,
              product_cost,
              product_price,
              discount,
            }: OrderItems,
            i,
            array
          ) => {
            masterValues.push(`productName='${product_name}'`);
            const amount = quantity * product_price;
            const profit = amount - quantity * product_cost - discount;

            totalItems += quantity;
            totalAmount += amount - discount;
            totalProfit += profit;
          }
        );

        masterValues.push(`totalItems='${totalItems}'`);
        masterValues.push(`totalAmount='${totalAmount}'`);
        masterValues.push(`totalProfit='${totalProfit}'`);
        masterValues.push(`totalAmount='Total items: ${totalItems}'`);
        masterValues.push(`totalAmount='Total amount: ₱ ${totalAmount}'`);
        masterValues.push(`totalProfit='Total profit: ₱ ${totalProfit}'`);

        rowContent.push(masterValues.join(""));
      }
    }

    // Date
    if (columnName === "Customer") {
      if (typeof renderedCellValue === "object") {
        if (renderedCellValue.props.forDate === true) {
          rowContent.push(`orderDate='${renderedCellValue.props.item}'`);
        }
      }
    }
  }

  if (rowContent.join("").toUpperCase().includes(searchInput.toUpperCase())) {
    console.log(rowContent.join(""));
    return true;
  }

  return false;

  // Return true if search input matches the current row
  return JSON.stringify(rowContent)
    .toUpperCase()
    .includes(searchInput.toUpperCase());
};

export default function App() {
  const [data, setData] = React.useState<Datatype[]>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  React.useEffect(() => {
    (async () => {
      const data = await Data();
      setData([...data]);
    })();
  }, []);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: false,
  });

  return (
    <div className="p-2">
      <div>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search"
        />
      </div>
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? <div></div> : null}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
      {/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}
    </div>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 1000,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <SearchbarContainer>
      <TextField
        inputProps={{
          style: { backgroundColor: "lightblue" },
          debounce: 1000,
          value,
          onChange: (e: React.FormEvent<HTMLInputElement>) =>
            setValue(e.currentTarget.value),
        }}
        id="filled-basic"
        label="Search orders"
        variant="filled"
      />
    </SearchbarContainer>
  );
}
