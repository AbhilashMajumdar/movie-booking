import { createContext, useState } from "react";
import { BASE_URL } from "../constants";

export const AppContext = createContext();
export const AppContextProvider = (props) => {
  const [userData, setUserData] = useState(null);
  const [moviesList, setMoviesList] = useState([]);

  const getUserData = async () => {
    try {
      const url =
        `${BASE_URL}/get-user-details`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("jwt-token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      const { user } = result;
      setUserData(user);
    } catch (error) {
      console.log("Error : ", error?.message || error);
    }
  };

  const getAllMovies = async () => {
    try {
      const url = `${BASE_URL}/get-all-movies`;
      const response = await fetch(url);
      const result = await response.json();
      const { movies } = result;
      setMoviesList(movies);
    } catch (error) {
      console.log("Error : ", error?.message || error);
    }
  };

  const getSearchMovie = async (movie) => {
    try {
      const url = `${BASE_URL}/search/movie?movieName=${movie}`;
      const response = await fetch(url);
      const result = await response.json();
      const { movies } = result;
      setMoviesList(movies);
    } catch (error) {
      console.log("Error : ", error?.message || error);
    }
  };

  const value = {
    userData,
    setUserData,
    getUserData,
    moviesList,
    getAllMovies,
    getSearchMovie,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
