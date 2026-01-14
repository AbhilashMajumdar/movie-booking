import express from "express";
import {
  addMovie,
  bookMovieSeats,
  deleteMovie,
  getAllMovies,
  getMovieDetails,
  getSearchMovie,
  updateMovieStatus,
} from "../controllers/movieController.js";

const movieRouter = express.Router();

movieRouter.post("/add-movie", addMovie);
movieRouter.get("/get-all-movies", getAllMovies);
movieRouter.get("/search/movie", getSearchMovie);
movieRouter.delete("/delete-movie/:id", deleteMovie);
movieRouter.put("/update-movie-status", updateMovieStatus);
movieRouter.get("/get-movie-details/:movieName", getMovieDetails);
movieRouter.put("/bookseats", bookMovieSeats);

export default movieRouter;
