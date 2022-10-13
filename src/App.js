import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loader,setLoader] = useState(true)
  async function fetchData() {
    const response = await fetch("https://swapi.dev/api/films")
      const data = await response.json()
      
        const transfornedData = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        
        setMovies(transfornedData);
        setLoader(false)
  
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchData}>Fetch Movies</button>
      </section>
      <section>
      {loader && <div className="loader"></div>}
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
