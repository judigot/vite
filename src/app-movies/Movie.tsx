import React from "react";

import styled from "styled-components";

const Movie = styled.div`
  text-align: center;
  margin: 5px;
  border: 1px solid black;

  padding: 10px;

  cursor: pointer;
`;

const Overview = styled.span`
  // display: none;
`;

const VoteAverage = styled.span`
  float: right;
`;

const MovieComponent = React.forwardRef(
  (
    props: any,
    ref:
      | ((instance: HTMLDivElement | null) => void)
      | React.RefObject<HTMLDivElement>
      | null
      | undefined
  ) => {
    const [isVisible, setIsVisible] = React.useState<boolean>(false);

    const row = props.movies;
    const toggleExpand = (e: any) => {
      setIsVisible(!isVisible);
    };

    return (
      // <Movie ref={ref} onClick={toggleExpand}>
      <Movie
        ref={ref}
        onClick={() => {
          props.toggleVisibility(row.id);
        }}
      >
        <h4>{row.original_title}</h4>

        {/* <Overview className={"overview " + (isVisible ? "" : "hidden")}>
          {row.overview}
        </Overview> */}
        {row.isVisible && <Overview>{row.overview}</Overview>}
        <VoteAverage>{row.vote_average}</VoteAverage>
      </Movie>
    );
  }
);

export default MovieComponent;
