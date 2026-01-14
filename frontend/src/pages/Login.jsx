import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { BASE_URL } from "../constants";

const Login = () => {
  const { getUserData, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    loginId: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const loginCopyData = { ...loginData };
    loginCopyData[name] = value;
    setLoginData(loginCopyData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${BASE_URL}/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const result = await response.json();
      const { success, message, token } = result;
      if (success) {
        localStorage.setItem("jwt-token", token);
        toast.success(message);
        setTimeout(() => {
          navigate("/");
        }, [2000]);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error?.message || error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Welcome Back
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="mt-2">
                <input
                  id="loginId"
                  name="loginId"
                  type="text"
                  placeholder="Enter Login ID ..."
                  value={loginData.loginId}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password ..."
                  value={loginData.password}
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
                Login
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm/6 text-gray-500">
            Dont have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
