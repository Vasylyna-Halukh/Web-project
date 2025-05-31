import React from "react";
import { movies } from "./data/movies";
import MovieList from "./components/MovieList";

const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "24px 0" }}>Кінотеатр</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default App;
