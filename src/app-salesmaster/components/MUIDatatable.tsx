import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { OrderItems } from "./OrdersTable";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

interface Props {
  title: string;
  columnNames?: MUIDataTableColumnDef[];
  data: Object[];
}

export default function App(props: Props) {
  const [responsive, setResponsive] = React.useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = React.useState("100%");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] =
    React.useState<string>("1000%");
  const [searchBtn, setSearchBtn] = React.useState<boolean>(true);
  const [downloadBtn, setDownloadBtn] = React.useState<boolean>(true);
  const [printBtn, setPrintBtn] = React.useState<boolean>(true);
  const [viewColumnBtn, setViewColumnBtn] = React.useState<boolean>(true);
  const [filterBtn, setFilterBtn] = React.useState<boolean>(true);

  let timer: NodeJS.Timeout | undefined = undefined;

  const [isLoading, setIsLOading] = React.useState<boolean>(false);

  const [columnNames, setColumnNames] = React.useState<Array<any>>([]);

  const [rowValues, setRowValues] = React.useState<Array<any>>([]);

  let columnNameAliases = React.useRef<string[]>([]);

  let oldCellValue = React.useRef<string>("");

  function extractData(result: Object[]) {
    const array = result;
    const columnNames = Object.keys(array[0]);
    const rowValues = [];
    for (let i = 0, arrayLength = array.length; i < arrayLength; i++) {
      const row = array[i];
      rowValues.push(Object.values(row));
    }
    return {
      rowValues,
      columnNames,
    };
  }

  function fetchFreshData() {
    fetch(`http://localhost:5000/api/orders`, {
      // *GET, POST, PUT, DELETE
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // For POST/PUT requests
      // body: JSON.stringify({ key: "value" }),
    })
      .then((response) => response.json())
      .then((result) => {
        columnNameAliases.current = Object.keys(result[0]);
        setColumnNames(props.columnNames || extractData(result).columnNames);
        setRowValues(extractData(result).rowValues);
      })
      .catch((error) => {
        // Failure
      });
  }

  React.useEffect(() => {
    // Initial render
    if (rowValues.length === 0) {
      getData();
    }

    async function getData() {
      fetchFreshData();
    }
  }, []);

  const options: Object = {
    //==========AJAX==========//
    // serverSide: true,
    onTableChange: (action: string, state: { [key: string]: string }) => {
      console.dir(action);
      // setIsLOading(true);

      if (action === "changeRowsPerPage") {
        console.log(state.rowsPerPage);
      }

      if (action === "viewColumnsChange" && state.searchText) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          fetchFreshData();
        }, 1000);
      }

      if (action === "search" && state.searchText) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          const query: string = state.searchText;
          // Reset state
          fetch(`http://localhost:5000/api/orders`, {
            // *GET, POST, PUT, DELETE
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            // For POST/PUT requests
            body: JSON.stringify({ searchQuery: query }),
          })
            .then((response) => response.json())
            .then((result) => {
              // Success
              if (result.length) {
                setRowValues(extractData(result).rowValues);
              } else {
                setRowValues([]);
              }
              setIsLOading(false);
            })
            .catch((error) => {
              // Failure
              throw new Error(error);
            });
        }, 1000);
      }
      if (action === "search" && !state.searchText) {
        // alert(state.searchText)
        fetchFreshData();
      }
    },
    //==========AJAX==========//
    pagination: true,
    resizableColumns: false,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10],
    selectableRows: "multiple", // single, multiple, none
    // selectableRowsOnClick: true,
    // rowsSelected: [1], // Pre-selected rows
    responsive: "standard",
    draggableColumns: {
      enabled: true,
      transitionTime: 500,
    },
    expandableRows: false,
    // renderExpandableRow: (rowData: any, rowMeta: any) => {
    //   const colSpan = rowData.length + 1;
    //   return (
    //     <TableRow>
    //       <TableCell onClick={() => {}} colSpan={colSpan}>
    //         Custom expandable row option. Data: {JSON.stringify(rowData)}
    //         Custom expandable row option. Data: {JSON.stringify(rowMeta)}
    //       </TableCell>
    //     </TableRow>
    //   );
    // },
    search: searchBtn, // Show search button
    searchOpen: true, // Show search bar  on initial render
    // searchText: "Initial search query",
    searchPlaceholder: "Search placeholder",
    searchProps: {
      onBlur: (e: Event) => {
        // console.log("onBlur!");
      },
      onKeyUp: (e: Event) => {
        // console.log(e);
      },
    },
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    tableBodyHeight,
    tableBodyMaxHeight,

    textLabels: {
      body: {
        noMatch: "Sorry, no matching records found",
      },
    },

    rowHover: true,

    selectableRowsHideCheckboxes: true, // Show/Hide row checkboxes
    selectableRowsHeader: false, // Show/Hide select-all-rows checkbox

    customRowRender: (row: string[], rowIndex: number) => {
      return (
        <TableRow key={rowIndex}>
          {/* <TableCell>
            <Checkbox />
          </TableCell> */}
          {row.map((cellValue: string, cellIndex: number) => {
            return (
              <TableCell
                // contentEditable="true"
                // suppressContentEditableWarning={true}
                onBlur={(e) => {
                  e.target.setAttribute("contenteditable", "false");
                  if (e.target.dataset.rowId) {
                    const rowID: number = parseInt(e.target.dataset.rowId);

                    fetch(`http://localhost:5000/api/orders/${rowID}`, {
                      // *GET, POST, PATCH, PUT, DELETE
                      method: "PATCH",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      // For POST/PUT requests
                      body: JSON.stringify({
                        columnName: columnNameAliases.current[cellIndex],
                        newValue: e.target.innerHTML,
                      }),
                    })
                      .then((response) => response.json())
                      .then((result) => {
                        // Success
                        if (!result.affectedRows) {
                          e.target.innerHTML = oldCellValue.current;
                          console.log("Failed to update cell value");
                        }
                      })
                      .catch((error) => {
                        // Failure
                        e.target.innerHTML = oldCellValue.current;
                        throw new Error(error);
                      });
                  }

                  // alert(
                  //   `Row ID: ${rowID}\nCell Column Index: ${cellIndex}\nCell Value: ${e.target.innerHTML}`
                  // );
                }}
                onDoubleClick={(e) => {
                  if (e !== null && e.target instanceof HTMLElement) {
                    oldCellValue.current = e.target.innerHTML;
                    e.target.setAttribute("contenteditable", "true");
                    e.target.focus();
                  }
                }}
                data-row-id={row[0]}
                key={cellIndex}
              >
                {!(typeof cellValue === "object") && cellValue}

                {typeof cellValue === "object" && (
                  <OrderItems items={cellValue} />
                )}
                {/* {typeof cellValue === "object" && JSON.stringify(cellValue)} */}
              </TableCell>
            );
          })}
        </TableRow>
      );
    },
  };

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
        <div style={{ userSelect: "none" }}>
          {isLoading && <h1>Loading</h1>}

          {!isLoading && (
            <MUIDataTable
              title={props.title}
              data={rowValues}
              // prettier-ignore
              columns={columnNames}
              options={options}
            />
          )}
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
