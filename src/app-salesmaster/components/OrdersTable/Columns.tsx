import { createColumnHelper } from "@tanstack/react-table";

import { OrderDetails } from "./OrderDetails/OrderDetails";

export interface Datatype {
  order_id: number;
  customer: string;
  order_product: OrderDetails[];
  order_date: Date;
}

const columnHelper = createColumnHelper<Datatype>();

export const customColumnNames: { [key: string]: string } = {
  order_id: "Order ID",
  customer: "Customer ID",
  order_product: "Order Products",
  order_date: "Date",
};

const columns: any = [];
for (
  let i = 0, arrayLength = Object.keys(customColumnNames).length;
  i < arrayLength;
  i++
) {
  const key: string[] = Object.keys(customColumnNames);
  const customColumnName: string = customColumnNames[key[i]];
  columns.push(
    columnHelper.accessor(
      (row: any) => {
        return row[key[i]];
      },
      {
        id: customColumnName,
        header: (info) => {
          return info.column.id;
        },
        cell: (info) => {
          if (info.getValue) {
            const cellValue: any = info.getValue();
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
