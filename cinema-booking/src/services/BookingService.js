// src/services/BookingService.js

const STORAGE_KEY_PREFIX = "bookings_";

export const BookingService = {
  /**
   * Повертає масив об’єктів бронювання для даного фільму (movieId).
   * Кожен об’єкт може виглядати, наприклад, так:
   *   { seats: ["A1","B2"], name: "Іван", phone: "...", email: "...", timestamp: "2025-06-01T12:34:56Z" }
   */
  getBookingsByMovie: (movieId) => {
    const data = localStorage.getItem(`${STORAGE_KEY_PREFIX}${movieId}`);
    try {
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error parsing bookings from localStorage:", e);
      return [];
    }
  },

  /**
   * Повертає масив рядкових позначень місць, які вже заброньовані для даного movieId.
   * Наприклад: ["A1", "B5", "C3", ...]
   */
  getBookedSeats: (movieId) => {
    const bookings = BookingService.getBookingsByMovie(movieId);
    // bookings — масив об’єктів, де кожен має властивість seats (массив обраних місць)
    const seats = [];
    bookings.forEach((b) => {
      if (Array.isArray(b.seats)) {
        seats.push(...b.seats);
      }
    });
    return seats;
  },

  /**
   * Додає нове бронювання (bookingData) до localStorage для даного movieId.
   * bookingData має вигляд:
   *   { seats: ["A1","A2"], name: "...", phone: "...", email: "...", timestamp: "..."}
   */
  addBooking: (movieId, bookingData) => {
    const bookings = BookingService.getBookingsByMovie(movieId);
    bookings.push(bookingData);
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${movieId}`,
      JSON.stringify(bookings)
    );
  },
};
