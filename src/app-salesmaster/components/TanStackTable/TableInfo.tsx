import { createColumnHelper } from "@tanstack/react-table";
import { OrderItems } from "@src/app-salesmaster/components/OrdersTable";
import ClickToSearch from "@src/app-salesmaster/components/ClickToSearch";

const columnHelper = createColumnHelper<Datatype>();

export const dynamicRender = true;

export interface Datatype {
  order_id: number;
  customer: string;
  order_product: OrderItems[];
  order_date: Date;
}

export const customColumnNames: { [key: string]: string } = {
  order_id: "Order ID",
  customer: "Customer ID",
  order_product: "Order Products",
  order_date: "Date",
};

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
        return <OrderItems items={cellValue} />;
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

        let dayOfTheWeek = date.getDay();
        const year = date.getFullYear();
        let day = date.getDate();
        const month = date.toLocaleString("default", {
          month: "long",
        });

        const time = new Date(cellValue).toLocaleString("en-US", {
          // year: "numeric",
          // month: "numeric",
          // day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        });

        return (
          <ClickToSearch
            forDate={true}
            item={`${month} ${day}, ${year} at ${time}`}
          />
        );
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
