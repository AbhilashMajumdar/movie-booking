import { movieModel } from "../models/movieModel.js";
import { userModel } from "../models/userModel.js";

export const addMovie = async (req, res, next) => {
  try {
    const { movieName, theatreName, totalNoOfTickets } = req.body;
    const existingMovie = await movieModel.findOne({ movieName });
    if (existingMovie) {
      return res.status(400).json({
        success: false,
        message: "This movie already added!",
      });
    }
    const newMovie = new movieModel({
      movieName,
      theatreName,
      totalNoOfTickets,
    });
    await newMovie.save();
    return res.status(200).json({
      success: true,
      message: "Movie added successfully!",
      movieName: newMovie.movieName,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllMovies = async (req, res, next) => {
  try {
    const movies = await movieModel.find();
    if (!movies) {
      return res.status(404).json({
        success: false,
        message: "No movie added!",
      });
    }
    return res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSearchMovie = async (req, res, next) => {
  try {
    const { movieName } = req.query;
    const movies = await movieModel.find({
      movieName: { $regex: movieName, $options: "i" },
    });
    if (!movies) {
      return res.status(200).json({
        success: false,
        message: "No movie found",
      });
    }
    return res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const deletedMovie = await movieModel.findByIdAndDelete(movieId);
    if (!deletedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Movie deleted successfully!",
      movieName: deletedMovie.movieName,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMovieStatus = async (req, res, next) => {
  try {
    const { id, status } = req.body;
    const existingMovie = await movieModel.findById(id);
    if (!existingMovie) {
      return res.status(404).json({
        status: false,
        message: "Movie not available!",
      });
    }
    const updatedMovie = await movieModel.findByIdAndUpdate(
      existingMovie?._id,
      {
        status,
      },
      { new: true }
    );
    await updatedMovie.save();
    return res.status(200).json({
      success: true,
      message: "Movie status updated successfuly",
      updatedMovie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMovieDetails = async (req, res, next) => {
  try {
    const { movieName } = req.params;
    if (!movieName) {
      return res.status(404).json({
        success: false,
        message: "Movie not found!",
      });
    }
    const movie = await movieModel.findOne({ movieName });
    return res.status(200).json({
      success: true,
      movie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookMovieSeats = async (req, res, next) => {
  try {
    const { id, bookedSeats, bookedNoOfTickets, tickets, userId } = req.body;

    const updatedMovie = await movieModel.findByIdAndUpdate(
      id,
      {
        bookedSeats,
        bookedNoOfTickets,
      },
      {
        new: true,
      }
    );
    await updatedMovie.save();
    const user = await userModel.findByIdAndUpdate(
      userId,
      {
        tickets,
      },
      { new: true }
    );
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Movie booked successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
