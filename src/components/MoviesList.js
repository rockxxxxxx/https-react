import React from "react";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MovieList = (props) => {
  function deleteMovies(id) {
    props.deleteHandler(id);
  }
  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          deleteMovies={deleteMovies}
          id={movie.id}
        />
      ))}
    </ul>
  );
};

export default MovieList;
