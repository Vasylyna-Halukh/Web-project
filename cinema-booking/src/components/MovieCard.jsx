// src/components/MovieCard.jsx
import React from "react";
import "./MovieCard.css"; // окремі стилі або можна робити стилізацію в index.css

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.posterUrl} alt={`${movie.title} poster`} className="movie-poster" />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-genre">{movie.genre}</p>
        <p className="movie-description">{movie.description}</p>
        <p className="movie-sessions">
          Сеанси:
          {movie.sessions.map((s, idx) => (
            <span key={idx} className="session-time"> {s}</span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
