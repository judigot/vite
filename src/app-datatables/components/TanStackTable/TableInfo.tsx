import { createColumnHelper } from "@tanstack/react-table";
import { OrderDetailsTable } from "@src/app-salesmaster/components/OrdersTable/OrderDetails";
import ClickToSearch from "@src/app-salesmaster/components/OrdersTable/ClickToSearch/ClickToSearch";

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

const handleClick = (item: string) => {
  alert(item);
};

export const columns = [
  columnHelper.accessor((row) => row.order_id, {
    id: "Order ID",
    header: (info) => {
      return <i>{info.column.id}</i>;
    },
    cell: (info) => {
      const cellValue = info.getValue();
      return cellValue;
    },
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.customer, {
    id: "Customer",
    header: (info) => {
      return <i>{info.column.id}</i>;
    },
    cell: (info) => {
      const cellValue = info.getValue();
      return (
        <ClickToSearch
          forCustomer={true}
          behavior={handleClick}
          item={cellValue}
        />
      );
    },
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.order_product, {
    id: "Order Products",
    header: (info) => {
      return <span>{info.column.id}</span>;
    },
    cell: (info) => {
      const cellValue = info.getValue();
      return <OrderDetailsTable items={cellValue} />;
    },
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.order_date, {
    id: "Date",
    header: (info) => {
      return <span>{info.column.id}</span>;
    },
    cell: (info) => {
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
          behavior={handleClick}
          item={`${month} ${day}, ${year} at ${time}`}
        />
      );

      // return (
      //   <>
      //     <div style={{ display: "none" }}>hidden</div>
      //     {`${month} ${day}, ${year} at ${time}`}
      //   </>
      // );
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
//           const cellValue: any = info.getValue();
//           if (cellValue.constructor.name === "Date") {
//             return cellValue.toString();
//           }
//           if (["Array", "Object"].includes(cellValue.constructor.name)) {
//             return JSON.stringify(cellValue);
//           }
//           return cellValue;
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
