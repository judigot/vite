import React from "react";

import type { FC } from "react";

import styled from "styled-components";

import MovieComponent from "./Movie";

const CenterDiv = styled.div`
  text-align: center;
`;

const Movies = styled.div`
  text-align: center;
  /* user-select: none; */
`;

const App: FC = () => {
  const [initialData, setInitialData] = React.useState<any>();

  const [visibleOverviews, setVisibleOverviews] = React.useState<HTMLElement[]>(
    []
  );

  let moviesRef: any = React.useRef([]);

  React.useEffect(() => {
    const API_KEY = "e3a89ca39100bceea4b71882246c87ff";
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1`;
    fetch(URL, {
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
        const movies = result.results;
        const mutatedMovies: object[] = [];
        movies.map((row: { [key: string]: string | number }, i: number) => {
          const mutation = {
            isVisible: false,
          };
          const mutated = { ...row, ...mutation };
          mutatedMovies.push(mutated);
        });
        setInitialData(mutatedMovies);
      })
      .catch((error) => {
        // Failure
      })
      .finally(() => {
        // Finally
      });
  }, []);

  const toggleAllOverviews = (isVisible: boolean) => {
    const mutatedMovies: object[] = [];
    initialData.map((row: { [key: string]: string | number }, i: number) => {
      const mutation = {
        isVisible,
      };
      const mutated = { ...row, ...mutation };
      mutatedMovies.push(mutated);
    });
    setInitialData(mutatedMovies);
  };

  const sort = (sortType: string) => {
    const sortedObject = structuredClone(initialData);

    const vote_average = "vote_average"; // 1st priority
    const sortByPopularity = "popularity"; // 2nd priority

    sortedObject.sort((a: any, b: any) => {
      return (
        (sortType === "asc" ? 1 : -1) * // Negate result for descending
        (a[vote_average] - b[vote_average] || // Main priority
          a[sortByPopularity] - b[sortByPopularity]) // Use another category if the former category values are equal
      );
    });

    setInitialData(sortedObject);
  };

  const addToRefs = (element: any) => {
    moviesRef.current.push(element);
  };

  const toggleMovieOverview = (movieIndex: number) => {
    const movie = moviesRef.current[movieIndex];

    if (!visibleOverviews.includes(movie)) {
      visibleOverviews.push(movie);
    } else {
      visibleOverviews.splice(visibleOverviews.indexOf(movie), 1);
    }
  };

  const toggleVisibility = (movieIndex: number) => {
    let targetMovie: object | undefined;
    let targetMovieIndex: number;
    let mutation: object | undefined;

    for (let i = 0, arrayLength = initialData.length; i < arrayLength; i++) {
      const element = initialData[i];

      if (element.id === movieIndex) {
        targetMovie = element;
        targetMovieIndex = i;
        mutation = {
          isVisible: !element.isVisible,
        };
      }
    }
    const mutatedMovie = { ...targetMovie, ...mutation };
    let newMovies = [...initialData];
    newMovies[targetMovieIndex!] = mutatedMovie;
    setInitialData(newMovies);
  };

  return (
    <>
      <CenterDiv>
        <button
          onClick={() => {
            toggleAllOverviews(true);
          }}
          type="button"
        >
          Expand All
        </button>
        <button
          onClick={() => {
            toggleAllOverviews(false);
          }}
          type="button"
        >
          Collapse All
        </button>
        <button
          onClick={() => {
            sort("asc");
          }}
          type="button"
        >
          Ascending
        </button>
        <button
          onClick={() => {
            sort("desc");
          }}
          type="button"
        >
          Descending
        </button>
        <br />
        <br />
      </CenterDiv>

      <Movies>
        {initialData?.map((row: { [key: string]: string }, i: number) => {
          return (
            <div
              key={row.id}
              onClick={() => {
                toggleMovieOverview(i);
              }}
            >
              <MovieComponent
                toggleVisibility={toggleVisibility}
                ref={addToRefs}
                key={row.id}
                movies={row}
              />
            </div>
          );
        })}
      </Movies>
    </>
  );
};

export default App;
