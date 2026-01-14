import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer, toast } from "react-toastify";
import ResetPassword from "./pages/ResetPassword";
import AdminHome from "./pages/AdminHome";
import ProtectedRoute from "./components/ProtectedRoute";
import MovieSeats from "./pages/MovieSeats";
import MyTickets from "./pages/MyTickets";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book/:movieName/:theatreName"
          element={
            <ProtectedRoute>
              <MovieSeats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-tickets"
          element={
            <ProtectedRoute>
              <MyTickets />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
