import { OrderDetails } from "./OrderDetails";

export interface Datatype {
  order_id: number;
  customer: string;
  order_product: OrderDetails[];
  order_date: Date;
  [key: string]: number | string | OrderDetails[] | Date;
}

export interface Person {
  first_name: string;
  last_name: string;
  birthday: Date;
  [key: string]: string | number | Date;
}

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
