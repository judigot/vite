import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import MUIDataTable from "./MUIDatatable";

import styled from "styled-components";

const OrderContainer = styled.div`
  text-align: center;
`;

interface Props {
  items: OrderItems[];
}

interface Order {
  order_id: number;
  customer: string;
  orderProducts: OrderItems[];
  order_date: Date;
}

interface OrderItems {
  id: number;
  order_id: number;
  product_name: number | string;
  quantity: number;
  product_cost: number;
  product_price: number;
  discount: number;
}

export default function Datatable() {
  return (
    <MUIDataTable
      title={"Users Table"}
      columnNames={[
        { name: "Order ID", options: { filterOptions: { fullWidth: true } } },
        { name: "Customer", options: { filterOptions: { fullWidth: true } } },
        { name: "Order Details", options: { display: true, searchable: true } },
        { name: "Order Date", options: { display: true, searchable: true } },
      ]}
      data={[]}
    />
  );
}

export const OrderItems = ({ items }: Props) => {
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [totalAmount, setTotalAmount] = React.useState<number>(0);
  const [totalProfit, setTotalProfit] = React.useState<number>(0);

  return (
    <>
      {localStorage.setItem("totalItems", "0")}
      {localStorage.setItem("totalAmount", "0")}
      {localStorage.setItem("totalProfit", "0")}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Product</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item: OrderItems, i: number) => {
              const totalAmount = item.quantity * item.product_price;

              const totalProfit =
                item.quantity * item.product_price -
                item.quantity * item.product_cost;

              localStorage.setItem(
                "totalItems",
                localStorage.getItem("totalItems")! + `+${item.quantity}`
              );

              localStorage.setItem(
                "totalAmount",
                localStorage.getItem("totalAmount")! + `+${totalAmount}`
              );

              localStorage.setItem(
                "totalProfit",
                localStorage.getItem("totalProfit")! + `+${totalProfit}`
              );
              return (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.product_name}</TableCell>
                  <TableCell align="right">₱ {item.product_cost}</TableCell>
                  <TableCell align="right">₱ {item.product_price}</TableCell>
                  <TableCell align="right">₱ {totalAmount}</TableCell>
                  <TableCell align="right">₱ {totalProfit}</TableCell>
                </TableRow>
              );
            })}
            <TableRow
              key={JSON.stringify(items)}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">
                Total items:
                <span>&nbsp;{eval(localStorage.getItem("totalItems")!)}</span>
              </TableCell>
              <TableCell colSpan={3}></TableCell>
              <TableCell align="right">
                Total amount:
                <span>
                  &nbsp;₱ {eval(localStorage.getItem("totalAmount")!)}
                </span>
              </TableCell>
              <TableCell align="right">
                Total profit:
                <span>
                  &nbsp;₱ {eval(localStorage.getItem("totalProfit")!)}
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {localStorage.removeItem("totalItems")}
      {localStorage.removeItem("totalAmount")}
      {localStorage.removeItem("totalProfit")}
    </>
  );
};

export function BasicTable() {
  const [initialData, setInitialData] = React.useState<Order[]>();
  const [columnNames, setColumnNames] = React.useState<string[]>();

  React.useEffect(() => {
    // Initial render
    if (!initialData) {
      getData();
    }

    async function getData() {
      // const response = await Data();
      // const data = await response.json();
      // setInitialData(data);

      fetch(`http://localhost:5000/api/orders`, {
        // *GET, POST, PATCH, PUT, DELETE
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // For POST, PATCH, and PUT requests
        // body: JSON.stringify({ key: "value" }),
      })
        .then((response) => response.json())
        .then((result) => {
          // Success
          setInitialData(result);
          setColumnNames(Object.keys(result[0]));
        })
        .catch((error) => {
          // Failure
        })
        .finally(() => {
          // Finally
        });
    }
  }, []);
  return (
    <OrderContainer>
      {/* <p>{JSON.stringify(initialData!)}</p> */}
      {initialData && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Order ID</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Order</TableCell>
                <TableCell align="right">Date</TableCell>
                {/* {columnNames?.map((columnName: string, i: number) => {
                  return <TableCell>{columnName}</TableCell>;
                })} */}
              </TableRow>
            </TableHead>
            <TableBody>
              {initialData.map((order: Order) => (
                <TableRow
                  key={order.order_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell align="right">{order.customer}</TableCell>
                  <TableCell align="right">
                    <OrderItems items={order.orderProducts} />
                    {/* {JSON.stringify(order.orderProducts, null, 2)} */}
                  </TableCell>
                  <TableCell align="right">
                    {order.order_date.toString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </OrderContainer>
  );
}
