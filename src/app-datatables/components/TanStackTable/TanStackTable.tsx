import React from "react";

import Data, { Datatype, columns } from "./TableInfo";

import { OrderItems } from "@src/app-salesmaster/components/OrdersTable";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Button } from "@mui/material";

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

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* grid-template-rows: repeat(2, 1fr); */
  background-color: black;
  width: 100%;
`;

const Box1 = styled.div`
  color: white;
  padding: 20px;
  margin: auto 0% auto 0%;
`;
const Box2 = styled.div``;

const SearchBarContainer = styled.div`
  /* width: 100%; */
  /* background-color: red; */
  padding: 20px;
  text-align: center;
`;

const PageActionsContainer = styled.div`
  background-color: black;
  padding: 20px;
  text-align: right;
  position: relative;
  float: right;
`;

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

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

  // Convert array to string and remove commas
  let rowInStringForm = rowContent.join("");

  // Sanitize: remove all spaces for better matching, convert to uppercase
  searchInput = searchInput.replace(/\s+/g, "").toUpperCase();
  rowInStringForm = rowInStringForm.replace(/\s+/g, "").toUpperCase();

  if (rowInStringForm.includes(searchInput)) {
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
    <div>
      <ThemeProvider theme={darkTheme}>
        <SearchBarContainer>
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search"
          />
        </SearchBarContainer>
        <TableContainer style={{ maxHeight: 500 }} component={Paper}>
          <Table stickyHeader>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableCell key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : "",
                                onClick:
                                  header.column.getToggleSortingHandler(),
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
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <GridWrapper>
          <Box1>
            <span>{table.getPrePaginationRowModel().rows.length} Orders</span>
            <span> | </span>
            <span className="flex items-center gap-1">
              <span>Page </span>
              <strong>
                {`${
                  table.getState().pagination.pageIndex + 1
                } of ${table.getPageCount()}`}
              </strong>
            </span>
            <span> | </span>
            <span className="flex items-center gap-1">
              Go to page: &nbsp;
              <select
                value={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
              >
                {[...Array(table.getPageCount())].map((value, i, array) => (
                  <option key={i} value={i + 1}>
                    Page {i + 1}
                  </option>
                ))}
              </select>
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
          </Box1>
          <Box2>
            <PageActionsContainer>
              <Button
                variant="contained"
                className="border rounded p-1"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                First
              </Button>
              <Button
                variant="contained"
                className="border rounded p-1"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                className="border rounded p-1"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
              <Button
                variant="contained"
                className="border rounded p-1"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                Last
              </Button>
            </PageActionsContainer>
          </Box2>
        </GridWrapper>
      </ThemeProvider>

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
    <TextField
      inputProps={{
        style: {
          width: "100%",
          backgroundColor: "darkblue",
          textAlign: "center",
        },
        debounce: 1000,
        value,
        onChange: (e: React.FormEvent<HTMLInputElement>) =>
          setValue(e.currentTarget.value),
      }}
      id="filled-basic"
      label="Search"
      variant="outlined"
    />
  );
}
