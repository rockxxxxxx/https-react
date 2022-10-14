import React, { useState, useCallback, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [timeOut, settimeout] = useState();
  const fetchData = useCallback(async () => {
    setLoader(true);
    setError(null);
    try {
      const response = await fetch(
        "https://snap-battle-ae7cc-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Some thing went wrong...Retrying");
      }
      const data = await response.json();
      const loadedData = [];
      for (const key in data) {
        loadedData.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedData);
    } catch (error) {
      setError(error.message);
      const time = setTimeout(() => {
        fetchData();
      }, 5000);
      settimeout(time);
    }

    setLoader(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function cancelRequset(data) {
    clearTimeout(data);
  }

  function addMovieHandler(movie) {
    fetch("https://snap-battle-ae7cc-default-rtdb.firebaseio.com/movies.json", {
      method: "POST",
      body: JSON.stringify(movie),
    }).then(fetchData);
  }

  function onDeleteHandler(id) {
    fetch(
      `https://snap-battle-ae7cc-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method: "DELETE",
      }
    ).then(fetchData());
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchData}>Fetch Movies</button>
      </section>
      <section>
        {loader && <div className="loader"></div>}
        {error && (
          <div>
            Something went wrong...Retrying{" "}
            <button onClick={() => cancelRequset(timeOut)}>
              Cancel Requset
            </button>
          </div>
        )}
        <MoviesList movies={movies} deleteHandler={onDeleteHandler} />
      </section>
    </React.Fragment>
  );
}

export default App;
