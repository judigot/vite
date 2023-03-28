import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { Datatype } from "./Data";
import { OrderDetails } from "./OrderDetails";

const columnHelper = createColumnHelper<Datatype>();

// Visible columns
const columnNames: { [key: string]: string } = {
  order_id: "Order ID",
  customer: "Customer",
  order_product: "Order Products",
  order_date: "Date",
};

export const assignColumnNames = (columnNames: { [key: string]: string }) => {
  const columns: ColumnDef<
    Datatype,
    number | string | OrderDetails[] | Date
  >[] = [];

  for (
    let i = 0, arrayLength = Object.keys(columnNames).length;
    i < arrayLength;
    i++
  ) {
    const key: string[] = Object.keys(columnNames);
    const columnName: string = columnNames[key[i]];
    columns.push(
      columnHelper.accessor(
        (row: Datatype) => {
          return row[key[i]];
        },
        {
          id: columnName,
          header: (info) => {
            return info.column.id;
          },
          cell: (info) => {
            if (info.getValue) {
              const cellValue = info.getValue();
              if (cellValue.constructor.name === "Date") {
                return cellValue.toString();
              }
              if (["Array", "Object"].includes(cellValue.constructor.name)) {
                return JSON.stringify(cellValue);
              }
              return cellValue.toString();
            } else {
              const cellValue = info;
              return JSON.stringify(cellValue);
            }
          },
          // footer: (info) => info.column.id,
        }
      )
    );
  }
  return columns;
};

export default assignColumnNames(columnNames);
