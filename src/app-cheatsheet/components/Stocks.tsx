import React, { useRef, useState } from "react";

interface Stock {
  open?: number;
  close?: number;
  high?: number;
  low?: number;
}

export default function StockData() {
  const searchInput = useRef<HTMLInputElement>(null!);

  const [stockList, setStockList] = useState([]);
  const [noResult, setNoResult] = useState(false);

  const handleSearch = async () => {
    const date = searchInput.current.value;

    if (date) {
      fetch("https://jsonmock.hackerrank.com/api/stocks?date=" + date)
        .then((response) => response.json())
        .then((result) => {
          if (result.data.length) {
            setStockList(result.data);
            setNoResult(false);
          } else {
            setNoResult(true);
            setStockList([]);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input
          ref={searchInput}
          type="text"
          className="large"
          placeholder="5-January-2000"
          id="app-input"
          data-testid="app-input"
        />
        <button
          onClick={() => {
            handleSearch();
          }}
          className=""
          id="submit-button"
          data-testid="submit-button"
        >
          Search
        </button>
      </section>

      {stockList &&
        stockList.map((row: Stock, i) => (
          <ul
            className="mt-50 slide-up-fade-in styled"
            id="stockData"
            data-testid="stock-data"
          >
            <li className="py-10">Open: {row.open}</li>
            <li className="py-10">Close: {row.close}</li>
            <li className="py-10">High: {row.high}</li>
            <li className="py-10">Low: {row.low}</li>
          </ul>
        ))}

      {!noResult || (
        <div
          className="mt-50 slide-up-fade-in"
          id="no-result"
          data-testid="no-result"
        >
          No Results Found
        </div>
      )}
    </div>
  );
}
