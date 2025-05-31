// src/pages/Booking.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CinemaHall from "../components/CinemaHall";
import { BookingService } from "../services/BookingService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Booking = () => {
  const { movieId } = useParams();

  // Місця, які вже зайняті (підтягуються з localStorage через сервіс)
  const [bookedSeats, setBookedSeats] = useState([]);
  // Місця, обрані користувачем у поточному сеансі
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Під час завантаження сторінки (і коли змінюється movieId) підтягуємо заброньовані місця
  useEffect(() => {
    const seats = BookingService.getBookedSeats(movieId);
    setBookedSeats(seats);
  }, [movieId]);

  // Отримуємо оновлений масив обраних від CinemaHall
  const handleSelectionChange = (seats) => {
    setSelectedSeats(seats);
  };

  // Функція, що викликається при натисканні кнопки «Забронювати»
  const handleBookSeats = () => {
    if (selectedSeats.length === 0) {
      toast.error("Оберіть хоча б одне місце перед бронюванням", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    // Формуємо об’єкт бронювання (можемо додати дані про користувача або timestamp)
    const bookingData = {
      seats: selectedSeats,
      timestamp: new Date().toISOString(),
      // Можна пізніше додати: name, phone, email, тощо
    };

    // Зберігаємо в localStorage через сервіс
    BookingService.addBooking(movieId, bookingData);

    // Показуємо повідомлення про успіх
    toast.success("Бронювання успішне!", {
      position: "top-right",
      autoClose: 2000,
    });

    // Оновлюємо bookedSeats, щоб нові червоні місця відображалися відразу
    const updatedBooked = BookingService.getBookedSeats(movieId);
    setBookedSeats(updatedBooked);

    // Очищуємо вибір користувача
    setSelectedSeats([]);
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2>Сторінка бронювання для фільму #{movieId}</h2>

      <CinemaHall
        bookedSeats={bookedSeats}
        onSelectionChange={handleSelectionChange}
      />

      <div style={{ marginTop: "24px" }}>
        <h3>Обрані місця:</h3>
        {selectedSeats.length > 0 ? (
          <ul>
            {selectedSeats.map((seat) => (
              <li key={seat}>{seat}</li>
            ))}
          </ul>
        ) : (
          <p>Місця не обрано</p>
        )}

        {/* Кнопка "Забронювати" */}
        <button
          onClick={handleBookSeats}
          disabled={selectedSeats.length === 0}
          style={{
            marginTop: "12px",
            padding: "8px 16px",
            backgroundColor: selectedSeats.length > 0 ? "#1976d2" : "#777",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: selectedSeats.length > 0 ? "pointer" : "not-allowed",
          }}
        >
          Забронювати
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Booking;
