// src/components/CinemaHall.jsx
import React, { useState, useEffect } from "react";
import "./CinemaHall.css"; // <-- перевірте, що цей файл існує і називається саме так

const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
const seatsPerRow = 10;

const CinemaHall = ({ bookedSeats = [], onSelectionChange }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const isBooked = (seat) => bookedSeats.includes(seat);
  const isSelected = (seat) => selectedSeats.includes(seat);

  const handleSeatClick = (seat) => {
    if (isBooked(seat)) return;
    if (isSelected(seat)) {
      setSelectedSeats((prev) => prev.filter((s) => s !== seat));
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  useEffect(() => {
    if (typeof onSelectionChange === "function") {
      onSelectionChange(selectedSeats);
    }
  }, [selectedSeats, onSelectionChange]);

  return (
    <div className="cinema-hall">
      {rows.map((row) => (
        <div key={row} className="seat-row">
          <span className="row-label">{row}</span>
          {Array.from({ length: seatsPerRow }, (_, i) => {
            const seat = `${row}${i + 1}`;
            return (
              <div
                key={seat}
                className={`seat ${
                  isBooked(seat) ? "booked" : isSelected(seat) ? "selected" : "available"
                }`}
                onClick={() => handleSeatClick(seat)}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      ))}
      <div className="legend">
        <div><span className="seat available"></span> Вільне</div>
        <div><span className="seat selected"></span> Обране</div>
        <div><span className="seat booked"></span> Заброньоване</div>
      </div>
    </div>
  );
};

export default CinemaHall;
