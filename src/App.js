import React, { useState, useCallback, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [timeOut, settimeout] = useState();
  const fetchData = useCallback(async () => {
    setLoader(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/film");
      if (!response.ok) {
        throw new Error("Some thing went wrong...Retrying");
      }
      const data = await response.json();

      const transfornedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transfornedData);
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

  return (
    <React.Fragment>
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
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
