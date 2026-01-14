import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userData, getUserData, getAllMovies } = useContext(AppContext);

  const token = localStorage.getItem("jwt-token");

  useEffect(() => {
    if (token) {
      getUserData();
      getAllMovies();
    }
  }, [token]);

  if (token) {
    return children;
  } else if (userData?.role === "admin") {
    return children;
  } else return <Navigate to={"/"} replace={true} />;
};

export default ProtectedRoute;
