import { createColumnHelper } from "@tanstack/react-table";

import { Datatype } from "./Data";

const columnHelper = createColumnHelper<Datatype>();

// Visible columns
const columnNames: { [key: string]: string } = {
  order_id: "Order ID",
  customer: "Customer ID",
  order_product: "Order Products",
  order_date: "Date",
};

const columns: object[] = [];
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
            return cellValue;
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
export default columns;
