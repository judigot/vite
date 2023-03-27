import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import Data from "../../helpers/Data";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

interface Props {
  title: string;
  columnNames?: MUIDataTableColumnDef[];
  data: Object[];
}

export default ({}: Props) => {
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
    Data()
      .then((result) => {
        // Success
        columnNameAliases.current = Object.keys(result[0]);
        setColumnNames(props.columnNames || extractData(result).columnNames);
        setRowValues(extractData(result).rowValues);
      })
      .catch((error) => {
        // Failure
      })
      .finally(() => {
        // Finally
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
          fetch(`http://localhost:5000/api/users`, {
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

                    fetch(`http://localhost:5000/api/users/${rowID}`, {
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
                {cellValue}
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
        {/* <FormControl>
          <InputLabel id="demo-simple-select-label">
            Responsive Option
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={responsive}
            style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
            onChange={(e) => setResponsive(e.target.value)}
          >
            <MenuItem value={"vertical"}>vertical</MenuItem>
            <MenuItem value={"standard"}>standard</MenuItem>
            <MenuItem value={"simple"}>simple</MenuItem>

            <MenuItem value={"scroll"}>scroll (deprecated)</MenuItem>
            <MenuItem value={"scrollMaxHeight"}>
              scrollMaxHeight (deprecated)
            </MenuItem>
            <MenuItem value={"stacked"}>stacked (deprecated)</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">
            Table Body Height
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tableBodyHeight}
            style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
            onChange={(e) => setTableBodyHeight(e.target.value)}
          >
            <MenuItem value={""}>[blank]</MenuItem>
            <MenuItem value={"400px"}>400px</MenuItem>
            <MenuItem value={"800px"}>800px</MenuItem>
            <MenuItem value={"100%"}>100%</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">
            Max Table Body Height
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tableBodyMaxHeight}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setTableBodyMaxHeight(e.target.value)}
          >
            <MenuItem value={""}>[blank]</MenuItem>
            <MenuItem value={"400px"}>400px</MenuItem>
            <MenuItem value={"800px"}>800px</MenuItem>
            <MenuItem value={"100%"}>100%</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Search Button</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchBtn}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setSearchBtn(e.target.value)}
          >
            <MenuItem value={"true"}>{"true"}</MenuItem>
            <MenuItem value={"false"}>{"false"}</MenuItem>
            <MenuItem value={"disabled"}>disabled</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Download Button</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={downloadBtn}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setDownloadBtn(e.target.value)}
          >
            <MenuItem value={"true"}>{"true"}</MenuItem>
            <MenuItem value={"false"}>{"false"}</MenuItem>
            <MenuItem value={"disabled"}>disabled</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Print Button</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={printBtn}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setPrintBtn(e.target.value)}
          >
            <MenuItem value={"true"}>{"true"}</MenuItem>
            <MenuItem value={"false"}>{"false"}</MenuItem>
            <MenuItem value={"disabled"}>disabled</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">
            View Column Button
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={viewColumnBtn}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setViewColumnBtn(e.target.value)}
          >
            <MenuItem value={"true"}>{"true"}</MenuItem>
            <MenuItem value={"false"}>{"false"}</MenuItem>
            <MenuItem value={"disabled"}>disabled</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Filter Button</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterBtn}
            style={{ width: "200px", marginBottom: "10px" }}
            onChange={(e) => setFilterBtn(e.target.value)}
          >
            <MenuItem value={"true"}>{"true"}</MenuItem>
            <MenuItem value={"false"}>{"false"}</MenuItem>
            <MenuItem value={"disabled"}>disabled</MenuItem>
          </Select>
        </FormControl> */}

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
