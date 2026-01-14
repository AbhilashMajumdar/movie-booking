import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants";

const Register = () => {
  const navigate = useNavigate();
  const [regData, setRegData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    loginId: "",
    password: "",
    confirmPassword: "",
    contactNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const regCopyData = { ...regData };
    regCopyData[name] = value;
    setRegData(regCopyData);
  };

  const rules = [
    {
      label: "*Minimum 8 characters",
      test: (value) => value.length >= 8,
    },
    {
      label: "*Contains uppercase letter",
      test: (value) => /[A-Z]/.test(value),
    },
    {
      label: "*Contains lowercase letter",
      test: (value) => /[a-z]/.test(value),
    },
    {
      label: "*Contains number",
      test: (value) => /[0-9]/.test(value),
    },
    {
      label: "*Contains special character (!@#$%^&*)",
      test: (value) => /[!@#$%^&*]/.test(value),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        regData.password
      );
    if (!isValidPassword) {
      toast.warning("Please follow the password rules and try again!");
      return;
    }
    try {
      const url = `${BASE_URL}/register`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(regData),
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        toast.success(message);
        setTimeout(() => {
          navigate("/login");
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
            Register
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter Firstname ..."
                  value={regData.firstName}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter Lastname ..."
                  value={regData.lastName}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Email ..."
                  value={regData.email}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="loginId"
                  name="loginId"
                  type="text"
                  placeholder="Enter Login ID ..."
                  value={regData.loginId}
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
                  value={regData.password}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {rules.map((rule, i) => {
              const isValid = rule.test(regData.password);
              return (
                <div key={i} className="text-center mb-0">
                  <span
                    className={`text-sm ${
                      isValid ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {rule.label}
                  </span>
                </div>
              );
            })}

            <div>
              <div className="mt-4">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Enter Confirm Password ..."
                  value={regData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="contactNo"
                  name="contactNo"
                  type="text"
                  placeholder="Enter Contact No ..."
                  value={regData.contactNo}
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
                Register
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm/6 text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
