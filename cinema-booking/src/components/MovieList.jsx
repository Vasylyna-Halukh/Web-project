// src/components/MovieList.jsx
import React, { useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

const MovieList = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movie-list-container">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Шукати фільм..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="movie-list-grid">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {filteredMovies.length === 0 && (
          <p className="no-results">За запитом "{searchTerm}" нічого не знайдено.</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
