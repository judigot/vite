import { createColumnHelper } from "@tanstack/react-table";
import ClickToSearch from "./ClickToSearch";
import { formatDate } from "./helpers";

import OrderDetailsTable, { OrderDetails } from "./OrderDetails/OrderDetails";

export interface Datatype {
  order_id: number;
  customer: string;
  order_product: OrderDetails[];
  order_date: Date;
}

const columnHelper = createColumnHelper<Datatype>();

const columns = [
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

export default columns;
