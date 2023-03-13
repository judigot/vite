import React from "react";

import type { FC } from "react";

import styled from "styled-components";

import MovieComponent from "./Movie";

import "./styles.css";

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

  // const [visibilityDetails, setVisibilityDetails] = React.useState<{
  //   [key: string]: any;
  // }>({ 505642: true, 1077280: true });

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

  const expandAll = () => {
    const mutatedMovies: object[] = [];
    initialData.map((row: { [key: string]: string | number }, i: number) => {
      const mutation = {
        isVisible: true,
      };
      const mutated = { ...row, ...mutation };
      mutatedMovies.push(mutated);
    });
    setInitialData(mutatedMovies);
  };

  const collapseAll = () => {
    const mutatedMovies: object[] = [];
    initialData.map((row: { [key: string]: string | number }, i: number) => {
      const mutation = {
        isVisible: false,
      };
      const mutated = { ...row, ...mutation };
      mutatedMovies.push(mutated);
    });
    setInitialData(mutatedMovies);
    // Array.prototype.forEach.call(
    //   document.querySelectorAll(".overview"),
    //   function (element, i) {
    //     element.classList.add("hidden");
    //   }
    // );
  };

  const sort = (sortType: string) => {
    const temp = structuredClone(initialData);

    if (sortType === "asc") {
      temp.sort((a: any, b: any) => {
        if (a.vote_average === b.vote_average) {
          // If two elements have same number, then the one who has larger rating.average wins
          return b.vote_average - a.vote_average;
        } else {
          // If two elements have different number, then the one who has larger number wins
          return b.vote_average - a.vote_average;
        }
      });
    }

    if (sortType === "desc") {
      temp.sort((a: any, b: any) => {
        if (a.vote_average === b.vote_average) {
          // If two elements have same number, then the one who has larger rating.average wins
          return a.vote_average - b.vote_average;
        } else {
          // If two elements have different number, then the one who has larger number wins
          return a.vote_average - b.vote_average;
        }
      });
    }
    setInitialData(temp);
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
        <button onClick={expandAll} type="button">
          Expand All
        </button>
        <button onClick={collapseAll} type="button">
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
