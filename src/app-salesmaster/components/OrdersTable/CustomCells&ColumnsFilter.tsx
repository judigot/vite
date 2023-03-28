import { OrderDetails } from "./OrderDetails/OrderDetails";

import { formatDate } from "./helpers";

export default (
  cellValue: Date | string | Array<string | number | object> | object,
  columnName: string,
  cell: {
    column: { columnDef: { cell: Function } };
    // id: object; row: object; getValue: object; renderValue: object; getContext: object; getIsGrouped: object; getIsPlaceholder: object; getIsAggregated: object;
  }
) => {
  const cellRendererFunction = cell.column.columnDef.cell;
  const JSXCellValue = cellRendererFunction(cell);

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
};
