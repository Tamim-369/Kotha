import React from "react";
import { Link } from "react-router-dom";
import useLogIn from "../hooks/useLogin";
import { useState } from "react";

const LogIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { loading, LogIn } = useLogIn();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    LogIn(formData);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-[80%] sm:min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-lg  shadow-primary-content  bg-primary-content">
        <h1 className="text-3xl my-2 flex justify-center gap-3 items-center font-semibold text-center text-gray-300">
          <span>Log In</span>
          <span className="text-white font-bold flex justify-center items-center gap-2 bg-gradient-to-bl py-2 px-3 rounded-md from-primary to-secondary">
            Kotha
          </span>
        </h1>
        <form onSubmit={handleSubmit} className="gap-3 flex flex-col">
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              name="password"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-block btn-md text-xl mt-4 text-white font-bold flex justify-center items-center gap-2 bg-gradient-to-r hover:bg-gradient-to-l hover:opacity-85 py-2 px-3 rounded-md from-primary to-secondary disabled:text-white disabled:opacity-85"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Log In"
            )}
          </button>
          <Link
            to="/signup"
            className="text-base w-full text-center hover:underline hover:text-primary mt-2 inline-block"
          >
            Don't have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
