import React from "react";
import { VariableSizeList as List } from "react-window";

import Data from "./helpers/Data";

interface Props {
  name?: string;
  age?: string;
  birthday?: Date;
  // For assigning dynamic keys (string)
  [key: string]: string | number | Date | undefined;

  // For assigning dynamic indexes (number)
  [index: number]: string | number | Date | undefined;
}

interface Datatype {
  id: number;
  "Column 1": string;
  order_id: number;
  customer_id: number;
  customer: string;
  order_product: object[];
  order_date: Date;
  [key: string]: number | string | object[] | Date;
}

export default ({}: Props) => {
  // const [count, setCount] = React.useState<number>(0);

  const [data, setInitialData] = React.useState<Datatype[]>();

  React.useEffect(() => {
    // Initial render
    if (!data) {
      getData();
    }

    async function getData() {
      // const response = await Data();
      // const data = await response.json();
      // setInitialData(data);

      Data()
        .then((result) => {
          // Success
          setInitialData(result);
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
    <>
      {data && (
        <List
          height={500}
          itemCount={data.length}
          itemSize={() => 100} // Row spacing
          width={"100%"}
          useIsScrolling={true}
        >
          {({ index, isScrolling, style }) => {
            const { order_id, customer, order_date } = data[index];

            return (
              <div style={style}>
                {/* {isScrolling ? <div>Loading...</div> : <div>Data {index}</div>} */}
                <div>
                  <div style={{ backgroundColor: "steelblue" }}>
                    <p>{order_id}</p>
                    <p>{customer}</p>
                    <p>{order_date.toString()}</p>
                  </div>
                </div>
              </div>
            );
          }}
        </List>
      )}
    </>
  );
};
