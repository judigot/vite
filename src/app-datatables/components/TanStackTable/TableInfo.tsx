import { createColumnHelper } from "@tanstack/react-table";
import { OrderItems } from "@src/app-salesmaster/components/OrdersTable";
import ClickToSearch from "@src/app-salesmaster/components/ClickToSearch";

const columnHelper = createColumnHelper<Datatype>();

export interface Datatype {
  order_id: number;
  customer: string;
  order_product: Array<any>;
  order_date: Date;
}

export const customColumnNames: { [key: string]: string } = {
  order_id: "Order ID",
  customer: "Customer ID",
  orderProducts: "Order Products",
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
      const cellData = info.getValue();
      return cellData;
    },
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.customer, {
    id: "Customer",
    header: (info) => {
      return <i>{info.column.id}</i>;
    },
    cell: (info) => {
      const cellData = info.getValue();
      return <ClickToSearch behavior={handleClick} item={cellData} />;
    },
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.order_product, {
    id: "Order Products",
    header: (info) => {
      return <span>{info.column.id}</span>;
    },
    cell: (info) => {
      const cellData = info.getValue();
      return <OrderItems items={cellData} />;
    },
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.order_date, {
    id: "Date",
    header: (info) => {
      return <span>{info.column.id}</span>;
    },
    cell: (info) => {
      const cellData = info.getValue();

      const date = new Date(cellData);

      let dayOfTheWeek = date.getDay();
      const year = date.getFullYear();
      let day = date.getDate();
      const month = date.toLocaleString("default", {
        month: "long",
      });

      const time = new Date(cellData).toLocaleString("en-US", {
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
// const columns: any = [];
// for (
//   let i = 0, arrayLength = Object.keys(customColumnNames).length;
//   i < arrayLength;
//   i++
// ) {
//   const key: string = Object.keys(customColumnNames)[i];
//   const customColumnName: string = customColumnNames[key];

//   console.log(key);

//   columns.push(
//     columnHelper.accessor((row: any) => row[key], {
//       id: customColumnName,
//       header: (info) => {
//         return info.column.id;
//       },
//       cell: (info) => {
//         const cellData = info.getValue();
//         // // Date/Datetime
//         // if (cellData instanceof Date) {
//         //   return cellData.toString();
//         // }

//         // // Object
//         // if (
//         //   cellData instanceof Object &&
//         //   !Array.isArray(cellData) &&
//         //   cellData.constructor.name === "Object"
//         // ) {
//         // }

//         // // Integer
//         // if (Number(cellData) === cellData && cellData % 1 === 0) {
//         //   return cellData;
//         // }
//         return JSON.stringify(cellData);
//       },
//       // footer: (info) => info.column.id,
//     })
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
