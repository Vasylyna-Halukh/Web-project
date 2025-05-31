// src/components/MovieCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/booking/${movie.id}`);
  };

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
            <span key={idx} className="session-time">{s}</span>
          ))}
        </p>
        <button className="book-button" onClick={handleBooking}>
          Забронювати
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
