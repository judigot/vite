import { OrderDetails } from "./OrderDetails";
import { assignColumnNames } from "./CustomColumns";

export interface Datatype {
  order_id: number;
  customer_id: number;
  customer: string;
  order_product: OrderDetails[];
  order_date: Date;
  [key: string]: number | string | OrderDetails[] | Date;
}

const URL = `http://localhost:5000/api/orders`;

const titleCaseColumnNames = true;

const Data = async () => {
  try {
    const response = await fetch(`${URL}`, {
      // *GET, POST, PATCH, PUT, DELETE
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*", // Same as axios
        "Content-Type": "application/json",
      },
      // For POST/PUT requests
      // body: JSON.stringify({ key: "value" }),
    });
    if (response?.ok) {
      return response.json();
    } else {
      throw new Error(`HTTP error: ${response}`);
    }
  } catch (error: unknown) {
    if (typeof error === `string`) {
      throw new Error(`There was an error: ${error}`);
    }
    if (error instanceof Error) {
      throw new Error(`There was an error: ${error.message}`);
    }
    if (error instanceof SyntaxError) {
      // Unexpected token < in JSON
      throw new Error(`Syntax Error: ${error}`);
    }
  } finally {
  }
};

const titleCase = (string: string) => {
  return string
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
    .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase());
};

export const DefaultColumns = await (async () => {
  try {
    const data: object[] = await Data();
    const keys: string[] = Object.keys(data[0]);
    const columnNames: { [key: string]: string } = {};

    for (let i = 0, arrayLength = keys.length; i < arrayLength; i++) {
      columnNames[keys[i]] = titleCaseColumnNames
        ? titleCase(keys[i])
        : keys[i];
    }

    return assignColumnNames(columnNames);
  } catch (error: unknown) {
    if (typeof error === `string`) {
      throw new Error(error);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
})();

export default Data;
