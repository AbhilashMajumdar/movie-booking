import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true,
    unique: true,
  },
  theatreName: {
    type: String,
    required: true,
  },
  totalNoOfTickets: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Available",
  },
  bookedNoOfTickets: {
    type: Number,
    default: 0,
  },
  bookedSeats: {
    type: Array,
    default: []
  },
});

export const movieModel = mongoose.model("Movie", movieSchema);
