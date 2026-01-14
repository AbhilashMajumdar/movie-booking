import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

const MoviesList = ({ moviesList }) => {
  const { userData, getAllMovies } = useContext(AppContext);
  const navigate = useNavigate();

  const deleteMovie = async (movieId) => {
    try {
      const url = `${BASE_URL}/delete-movie/${movieId}`;
      const response = await fetch(url, {
        method: "DELETE",
      });
      const result = await response.json();
      const { movieName, success, message } = result;
      if (success) {
        toast.success(`${movieName} deleted successfully!`);
        getAllMovies();
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error?.message || error);
    }
  };

  const handleDelete = (movie) => {
    deleteMovie(movie._id);
  };

  const handleMovieBook = (movie) => {
    if (!userData) {
      toast.warning("Please login to book movie");
      setTimeout(() => {
        navigate("/login");
      }, [3000]);
    } else {
      navigate(`/book/${movie?.movieName}/${movie?.theatreName}`);
    }
  };

  const updateMovieStatus = async (id, status) => {
    try {
      const url =
        `${BASE_URL}/update-movie-status`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });
      const result = await response.json();
      const { message, success, updatedMovie } = result;
      if (success) {
        toast.success(`${updatedMovie?.movieName} status updated!`);
        getAllMovies();
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error?.message || error);
    }
  };

  const handleMovieStatus = (movie, status) => {
    updateMovieStatus(movie._id, status);
  };

  const handleRefreshAvailability = (movie) => {
    if (movie) {
      const totalTickets = movie?.totalNoOfTickets;
      const bookedTickets = movie?.bookedNoOfTickets;
      const availableTickets = totalTickets - bookedTickets;
      let status = "";
      if (availableTickets > bookedTickets) {
        status = "Available";
      } else if (availableTickets === 0) {
        status = "SOLD OUT";
      } else if (availableTickets <= totalTickets / 2) {
        status = "BOOK ASAP";
      }
      updateMovieStatus(movie._id, status);
    }
  };

  return (
    <>
      <div className="flex w-full justify-center items-center mt-12 mb-36">
        <div
          className={`${
            moviesList?.length > 1
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-10/12"
              : "w-10/12"
          }`}
        >
          {moviesList?.map((movie, i) => {
            return (
              <div
                className="p-6 bg-gray-100 rounded-xl w-full text-center"
                key={i}
              >
                <div>
                  <h1 className="text-xl font-bold">{movie.movieName}</h1>
                </div>
                <div className="m-2">
                  <p>{movie.theatreName}</p>
                </div>
                {userData?.role === "admin" && (
                  <div className="m-2">
                    <span>Booked Tickets: {movie?.bookedNoOfTickets}</span>
                  </div>
                )}
                <div className="m-2">
                  <span>
                    Available:{" "}
                    <span className="font-bold">
                      {movie?.totalNoOfTickets - movie?.bookedNoOfTickets}
                    </span>
                  </span>
                </div>
                <div className="m-2">
                  <span>
                    Status:{" "}
                    <span
                      className={`${
                        movie?.status === "SOLD OUT" ||
                        movie?.totalNoOfTickets === movie?.bookedNoOfTickets
                          ? "text-red-500"
                          : movie?.status === "Available"
                          ? "text-green-500"
                          : "text-blue-500"
                      } font-bold`}
                    >
                      {movie?.totalNoOfTickets === movie?.bookedNoOfTickets
                        ? "SOLD OUT"
                        : movie?.status}
                    </span>{" "}
                  </span>
                </div>
                {userData?.role !== "admin" && (
                  <div className="m-3">
                    <button
                      className={`py-2 px-4 text-white rounded-xl cursor-pointer  ${
                        movie?.status === "SOLD OUT" ||
                        movie?.totalNoOfTickets === movie?.bookedNoOfTickets
                          ? "bg-gray-700"
                          : "bg-black hover:bg-blue-700"
                      }`}
                      onClick={() => handleMovieBook(movie)}
                      disabled={
                        movie?.status === "SOLD OUT" ||
                        movie?.totalNoOfTickets === movie?.bookedNoOfTickets
                      }
                    >
                      {movie?.status === "SOLD OUT"
                        ? "SOLD OUT"
                        : movie?.totalNoOfTickets === movie?.bookedNoOfTickets
                        ? "SOLD OUT"
                        : "Book Now"}
                    </button>
                  </div>
                )}
                {userData?.role === "admin" && (
                  <div className="m-3">
                    <button
                      className="py-2 w-full px-4 bg-blue-500 text-white rounded-xl cursor-pointer hover:bg-blue-700"
                      onClick={() => handleMovieStatus(movie, "BOOK ASAP")}
                    >
                      Mark Book ASAP
                    </button>
                  </div>
                )}
                {userData?.role === "admin" && (
                  <div className="my-3 w-full flex justify-center gap-2">
                    <div>
                      <button
                        className="py-2 px-1 bg-red-500 text-white rounded-xl cursor-pointer hover:bg-red-700"
                        onClick={() => handleMovieStatus(movie, "SOLD OUT")}
                      >
                        Mark Sold Out
                      </button>
                    </div>
                    <div>
                      <button
                        className="py-2 px-1 bg-red-500 text-white rounded-xl cursor-pointer hover:bg-red-700"
                        onClick={() => handleRefreshAvailability(movie)}
                      >
                        Refresh Availability
                      </button>
                    </div>
                  </div>
                )}
                {userData?.role === "admin" && (
                  <div className="m-3">
                    <button
                      className="py-2 px-4 bg-gray-700 text-white rounded-xl cursor-pointer hover:bg-gray-900"
                      onClick={() => handleDelete(movie)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MoviesList;
