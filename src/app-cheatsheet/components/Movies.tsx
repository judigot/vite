import React, { useRef, useState } from "react";

interface Movie {
  Title?: string;
}

function MovieList() {
  const searchInputRef = useRef<HTMLInputElement>(null!);

  const [movieList, setMovieList] = useState([]);
  const [noResult, setNoResult] = useState(false);

  const handleSearch = async () => {
    const year = parseInt(searchInputRef.current.value);

    if (year) {
      fetch("https://jsonmock.hackerrank.com/api/movies?Year=" + year)
        .then((response) => response.json())
        .then((result) => {
          if (result.data.length) {
            setMovieList(result.data);
            setNoResult(false);
          } else {
            setNoResult(true);
            setMovieList([]);
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const movies = movieList ? (
    <ul className="mt-50 styled" data-testid="movieList">
      {movieList &&
        movieList.map((row: Movie, i) => <li key={i}>{row.Title}</li>)}
    </ul>
  ) : null;
  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input
          ref={searchInputRef}
          type="number"
          className="large"
          placeholder="Enter Year eg 2015"
          data-testid="app-input"
        />
        <button
          onClick={() => {
            handleSearch();
          }}
          className=""
          data-testid="submit-button"
        >
          Search
        </button>
      </section>

      {movieList ? movies : null}

      {!noResult || (
        <div className="mt-50 slide-up-fade-in" data-testid="no-result">
          No Results Found
        </div>
      )}
    </div>
  );
}

export default MovieList;
