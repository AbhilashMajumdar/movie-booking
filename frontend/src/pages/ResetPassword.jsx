import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPasswordData, setResetPasswordData] = useState({
    loginId: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const resetPasswordCopyData = { ...resetPasswordData };
    resetPasswordCopyData[name] = value;
    setResetPasswordData(resetPasswordCopyData);
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
        resetPasswordData.password
      );
    if (!isValidPassword) {
      toast.warning("Please follow the password rules and try again!");
      return;
    }
    try {
      const url = `${BASE_URL}/forgot-password`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetPasswordData),
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        toast.success(message);
        setTimeout(() => {
          navigate("/");
        }, [3000]);
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
            Reset Password
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="mt-2">
                <input
                  id="loginid"
                  name="loginid"
                  type="text"
                  placeholder="Enter Login ID ..."
                  value={resetPasswordData.loginId}
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
                  value={resetPasswordData.password}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {rules.map((rule, i) => {
              const isValid = rule.test(resetPasswordData.password);
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
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  placeholder="Enter Confirm Password ..."
                  value={resetPasswordData.confirmPassword}
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
