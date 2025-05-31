// src/pages/Home.jsx
import React from "react";
import { movies } from "../data/movies";       // Переконайтеся, що цей шлях теж коректний
import MovieList from "../components/MovieList";

const Home = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "24px 0" }}>Список фільмів</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
