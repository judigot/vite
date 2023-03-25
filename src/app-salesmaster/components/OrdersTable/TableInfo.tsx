import { createColumnHelper } from "@tanstack/react-table";
import ClickToSearch from "./ClickToSearch/ClickToSearch";

import OrderDetailsTable, { OrderDetails } from "./OrderDetails/OrderDetails";

const columnHelper = createColumnHelper<Datatype>();

export const dynamicRender = true;

export interface Datatype {
  order_id: number;
  customer: string;
  order_product: OrderDetails[];
  order_date: Date;
}

export const customColumnNames: { [key: string]: string } = {
  order_id: "Order ID",
  customer: "Customer ID",
  order_product: "Order Products",
  order_date: "Date",
};

export const filterHelper: { [key: string]: Function } = {
  cellToString: (
    columnName: string,
    cellValue: Date | string | Array<string | number | object> | object
  ) => {
    let rowInStringForm: string = "";
    // Order ID
    if (columnName === "Order ID") {
      return `orderID='${cellValue}'`;
    }

    // Customer
    if (columnName === "Customer") {
      return `customerName='${cellValue}'`;
    }

    // Order Products
    if (columnName === "Order Products") {
      const orderDetails: string[] = [];
      const value = cellValue;
      let totalItems: number = 0;
      let totalAmount: number = 0;
      let totalProfit: number = 0;

      (value as OrderDetails[]).map(
        ({
          id,
          order_id,
          product_name,
          quantity,
          product_cost,
          product_price,
          discount,
        }: OrderDetails) => {
          orderDetails.push(`productName='${product_name}'`);
          const amount = quantity * product_price;
          const profit = amount - quantity * product_cost - discount;

          totalItems += quantity;
          totalAmount += amount - discount;
          totalProfit += profit;
        }
      );

      orderDetails.push(`totalItems='${totalItems}'`);
      orderDetails.push(`totalAmount='${totalAmount}'`);
      orderDetails.push(`totalProfit='${totalProfit}'`);
      orderDetails.push(`totalAmount='Total items: ${totalItems}'`);
      orderDetails.push(`totalAmount='Total amount: ₱ ${totalAmount}'`);
      orderDetails.push(`totalProfit='Total profit: ₱ ${totalProfit}'`);

      return orderDetails.join("");
    }

    // Date
    if (columnName === "Date") {
      return `orderDate='${cellValue}' orderDate='${formatDate(
        new Date(cellValue as Date)
      )}'`;
    }

    // return cellValue;
  },
  filter: (
    columnName: string,
    cellValue: Date | string | Array<string | number | object> | object
  ) => {
    if (cellValue.constructor.name === "Date") {
      return cellValue.toString();
    }
    if (["Array", "Object"].includes(cellValue.constructor.name)) {
      return JSON.stringify(cellValue);
    }
    return cellValue;
  },
};

function formatDate(date: Date) {
  const year = date.getFullYear();
  let day = date.getDate();
  const month = date.toLocaleString("default", {
    month: "long",
  });

  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return `${month} ${day}, ${year} at ${time}`;
}

export const columns = [
  columnHelper.accessor((row) => row.order_id, {
    id: "Order ID",
    header: (info) => {
      return <h1>{info.column.id}</h1>;
    },
    cell: (info) => {
      if (info.getValue) {
        const cellValue = info.getValue();
        return cellValue;
      } else {
        const cellValue = info;
        return JSON.stringify(cellValue);
      }
    },
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.customer, {
    id: "Customer",
    header: (info) => {
      return <h1>{info.column.id}</h1>;
    },
    cell: (info) => {
      if (info.getValue) {
        const cellValue = info.getValue();
        return <ClickToSearch forCustomer={true} item={cellValue} />;
      } else {
        const cellValue = info;
        return JSON.stringify(cellValue);
      }
    },
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.order_product, {
    id: "Order Products",
    header: (info) => {
      return <h1>{info.column.id}</h1>;
    },
    cell: (info) => {
      if (info.getValue) {
        const cellValue = info.getValue();
        return <OrderDetailsTable items={cellValue} />;
      } else {
        const cellValue = info;
        return JSON.stringify(cellValue);
      }
    },
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.order_date, {
    id: "Date",
    header: (info) => {
      return <h1>{info.column.id}</h1>;
    },
    cell: (info) => {
      if (info.getValue) {
        const cellValue = info.getValue();

        const date = new Date(cellValue);

        return <ClickToSearch forDate={true} item={formatDate(date)} />;
      } else {
        const cellValue = info;
        return JSON.stringify(cellValue);
      }
    },
    // footer: (info) => info.column.id,
  }),
];

// Dynamic column helper
// export const columns: any = [];
// for (
//   let i = 0, arrayLength = Object.keys(customColumnNames).length;
//   i < arrayLength;
//   i++
// ) {
//   const key: string[] = Object.keys(customColumnNames);
//   const customColumnName: string = customColumnNames[key[i]];
//   columns.push(
//     columnHelper.accessor(
//       (row: any) => {
//         return row[key[i]];
//       },
//       {
//         id: customColumnName,
//         header: (info) => {
//           return info.column.id;
//         },
//         cell: (info) => {
//           if (info.getValue) {
//             const cellValue: any = info.getValue();
//             if (cellValue.constructor.name === "Date") {
//               return cellValue.toString();
//             }
//             if (["Array", "Object"].includes(cellValue.constructor.name)) {
//               return JSON.stringify(cellValue);
//             }
//             return cellValue;
//           } else {
//             const cellValue = info;
//             return JSON.stringify(cellValue);
//           }
//         },
//         // footer: (info) => info.column.id,
//       }
//     )
//   );
// }

export default async function getData() {
  return await fetch(`http://localhost:5000/api/orders`, {
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
    .then((result) => result)
    .catch((error) => {
      // Failure
    });
}
