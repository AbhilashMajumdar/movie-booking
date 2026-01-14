import React, { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MoviesList from "../components/MoviesList";
import SearchMovie from "../components/SearchMovie";
import Header from "../components/Header";
import NotFound from "../components/NotFound";

const Home = () => {
  const { userData, getUserData, moviesList, getAllMovies } =
    useContext(AppContext);

  const token = localStorage.getItem("jwt-token");

  useEffect(() => {
    getAllMovies();
  }, []);

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  return (
    <>
      <div className="my-8">
        <Header heading={"Now Showing"} />
      </div>
      <SearchMovie />
      {moviesList?.length > 0 && <MoviesList moviesList={moviesList} />}
      {moviesList?.length === 0 && <NotFound />}
    </>
  );
};

export default Home;
