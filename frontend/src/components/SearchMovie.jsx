import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const SearchMovie = () => {
  const [movieName, setMovieName] = useState("");
  const { getAllMovies, getSearchMovie } = useContext(AppContext);

  const handleSearch = () => {
    if (movieName) {
      getSearchMovie(movieName);
    } else {
      getAllMovies();
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center w-full mb-8">
        <div className="bg-gray-100 px-8 py-6 text-center rounded-xl">
          <input
            type="text"
            className="border-2 rounded-xl px-3 py-1 mr-2 mb-2 sm:mb-0"
            placeholder="Enter movie name ..."
            id="movieName"
            name="movieName"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            required
          />
          <button
            className="py-2 px-3 bg-black text-white rounded-xl hover:bg-blue-700 cursor-pointer"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchMovie;
