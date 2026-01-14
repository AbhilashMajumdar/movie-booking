import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import MoviesList from "../components/MoviesList";
import { AppContext } from "../context/AppContext";
import { BASE_URL } from "../constants";

const AdminHome = () => {
  const [movieData, setMovieData] = useState({
    movieName: "",
    theatreName: "",
    totalNoOfTickets: "",
  });
  const { userData, getUserData, moviesList, getAllMovies } =
    useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const movieCopyData = { ...movieData };
    movieCopyData[name] = value;
    setMovieData(movieCopyData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${BASE_URL}/add-movie`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });
      const result = await response.json();
      const { success, message, movieName } = result;
      if (success) {
        toast.success(`${movieName} added successfully!`);
        getAllMovies();
      } else {
        toast.error(message);
      }
      setTimeout(() => {
        setMovieData({
          movieName: "",
          theatreName: "",
          totalNoOfTickets: "",
        });
      }, [2000]);
    } catch (error) {
      toast.error(error?.message || error);
    }
  };
  return (
    <div>
      <div className="flex justify-center w-full m-4 mt-6">
        <h1 className="text-2xl text-black font-bold">Admin Dashboard</h1>
      </div>
      <div>
        <p className="flex justify-center w-full m-2">
          Manage movies, ticket availability & status
        </p>
      </div>

      {/* add movie section  */}
      <div>
        <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Add New Movie
            </h2>
          </div>

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="mt-2">
                  <input
                    id="movieName"
                    name="movieName"
                    type="text"
                    placeholder="Enter Movie Name ..."
                    value={movieData.movieName}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <input
                    id="theatreName"
                    name="theatreName"
                    type="text"
                    placeholder="Enter Theatre Name ..."
                    value={movieData.theatreName}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <input
                    id="totalNoOfTickets"
                    name="totalNoOfTickets"
                    type="text"
                    placeholder="Enter Total Tickets ..."
                    value={movieData.totalNoOfTickets}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Movie
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* movies list  */}
      <MoviesList moviesList={moviesList} />
    </div>
  );
};

export default AdminHome;
