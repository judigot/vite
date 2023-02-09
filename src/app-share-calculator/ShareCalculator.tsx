import React from "react";
import "./scss/App.scss";

const MAX_VAL = 1000000;

interface Form {
  profit?: number;
}

interface InvestorTypes {
  [key: string]: number;
}

const investors: InvestorTypes = {
  jude: 74000,
  welmer: 74000,
  louis: 74000,
  mark: 74000,
  kyle: 34000,
};

function App() {
  const profitRef = React.useRef<HTMLInputElement>(null);

  const [table, setTable] = React.useState<React.ReactElement>();

  const sumValues = (object: object): number =>
    Object.values(object).reduce((a: any, b: any) => a + b);

  const handleChange = (e: React.ChangeEvent) => {
    const profitVal: Form["profit"] = profitRef.current
      ?.value as unknown as number;

    if (profitVal <= MAX_VAL) {
      const pool: number = sumValues(investors);

      // Render table headers
      const thead: React.ReactElement[] = Object.entries(investors).map(
        ([key, value]) => {
          return (
            <th>
              {key} ({((value / pool) * 100).toFixed(2)}%){" "}
            </th>
          );
        }
      );

      //
      const td: any = Object.entries(investors).map(([key, value]) => {
        const sliceOfThePie = (profitVal * (value / pool)).toFixed(2);
        return (
          <td>
            {sliceOfThePie.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </td>
        );
      });

      setTable(
        <table>
          <thead>{thead}</thead>
          <tbody>
            <tr>{td}</tr>
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Share Calculator</h1>
        <input
          ref={profitRef}
          onChange={(e) => {
            handleChange(e);
          }}
          type="number"
          name="profit"
          id="profit"
          min="0"
          max={MAX_VAL}
        />

        <br />

        {table}
      </header>
    </div>
  );
}

export default App;
