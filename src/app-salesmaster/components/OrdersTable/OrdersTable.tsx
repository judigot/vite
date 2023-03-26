import React from "react";

import Data, { Datatype } from "./Data";

import Columns from "./CustomColumns";
import Filter from "./CustomFilter";

// import Columns from "./Columns";
// import Filter from "./DefaultFilter";

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
  Cell,
} from "@tanstack/react-table";

import { RankingInfo } from "@tanstack/match-sorter-utils";
import TextField from "@mui/material/TextField/TextField";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useSelector } from "react-redux";
import { RootState } from "@src/app-salesmaster/store";

import styled from "styled-components";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const OrdersLayout = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  color: white !important;
  height: 100px;
  width: 100%;
  background-color: black;
`;
const OrdersSearch = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
`;
const OrdersBody = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  background-color: black;
  height: 100%;
  width: 100%;
`;
const OrdersFooter = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: black;
  width: 100%;
`;

const PageInfoContainer = styled.div`
  color: white;
  padding: 20px;
  margin: auto 0% auto 0%;
`;

const PageNavigationContainer = styled.div`
  /* background-color: black; */
  padding: 20px;
  text-align: right;
  position: relative;
  float: right;
`;

const SearchBarContainer = styled.div`
  /* width: 100%; */
  /* background-color: black; */
  padding: 20px;
  text-align: center;
`;

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<Datatype> = (
  row,
  columnId,
  searchInput,
  addMeta
) => {
  const rowContent = [];
  for (
    let i = 0, arrayLength = row.getVisibleCells().length;
    i < arrayLength;
    i++
  ) {
    const columnName = row.getVisibleCells()[i].column.id;

    const cell = row.getVisibleCells()[i] as {
      column: { columnDef: { cell: Function } };
    };

    const cellValue = row.getVisibleCells()[i].getValue() as
      | string
      | object
      | Date
      | (string | number | object)[];

    rowContent.push(Filter(cellValue, columnName, cell));
    // rowContent.push(CustomFilter(cellValue, columnName, cell));
  }

  // Convert array to string and remove commas
  let rowInStringForm = rowContent.join("");

  // Sanitize: remove all spaces for better matching, convert to uppercase
  searchInput = searchInput.replace(/\s+/g, "").toUpperCase();
  rowInStringForm = rowInStringForm.replace(/\s+/g, "").toUpperCase();

  if (rowInStringForm.includes(searchInput)) {
    return true;
  }

  return false;
};

export default function App() {
  const searchQuery = useSelector(
    (state: RootState) => state.searchQuery.query
  );

  const [data, setData] = React.useState<Datatype[]>([]);
  const [globalFilter, setGlobalFilter] = React.useState(searchQuery);

  React.useEffect(() => {
    (async () => {
      const data = await Data();
      setData([...data]);
    })();
  }, []);

  const table = useReactTable({
    data,
    columns: Columns,
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
    <ThemeProvider theme={darkTheme}>
      <OrdersLayout>
        <OrdersSearch>
          {/* <div>Search</div> */}
          <SearchBarContainer>
            <DebouncedInput
              value={searchQuery ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder="Search"
            />
          </SearchBarContainer>
        </OrdersSearch>
        <OrdersBody>
          <TableContainer style={{ height: 400 }} component={Paper}>
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
                                <i>
                                  {{
                                    asc: "(Ascending)",
                                    desc: "(Descending)",
                                  }[header.column.getIsSorted() as string] ??
                                    null}
                                </i>
                              </div>
                              {header.column.getCanFilter() ? (
                                <div></div>
                              ) : null}
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
        </OrdersBody>
        <OrdersFooter>
          <PageInfoContainer>
            {/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}
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
          </PageInfoContainer>
          <PageNavigationContainer>
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
          </PageNavigationContainer>
        </OrdersFooter>
      </OrdersLayout>
    </ThemeProvider>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 0, // Search delay
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  let timer: NodeJS.Timeout | undefined = undefined;
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    timer = setTimeout(() => {
      onChange(value);
    }, debounce);
  }, [value]);

  return (
    <TextField
      inputProps={{
        autoFocus: true,
        id: "searchInput",
        style: {
          width: "100%",
          backgroundColor: "darkblue",
          textAlign: "center",
        },
        debounce: 1000,
        value,
        onChange: (e: React.FormEvent<HTMLInputElement>) => {
          clearTimeout(timer);
          setValue(e.currentTarget.value);
        },
      }}
      id="filled-basic"
      label="Search"
      variant="outlined"
    />
  );
}
