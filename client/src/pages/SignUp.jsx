import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useSignUp from "../hooks/useSignUp";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    gender: "male",
    password: "",
  });
  const { signUp, loading } = useSignUp();
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
    signUp(formData);
  };
  return (
    <div className="flex flex-col items-center justify-center sm:min-w-96 mx-auto">
      <div className="w-full py-6 px-6 sm:px-10 rounded-lg shadow-lg  shadow-primary-content  bg-primary-content">
        <h1 className="text-2xl sm:text-3xl my-2 flex justify-center gap-3 items-center font-semibold text-center text-gray-300">
          <span>Log In</span>
          <span className="text-white font-bold flex justify-center items-center gap-2 bg-gradient-to-bl py-2 px-3 rounded-md from-primary to-secondary">
            Kotha
          </span>
        </h1>
        <form onSubmit={handleSubmit} className="gap-1 flex flex-col">
          <div>
            <label className="label py-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="input input-md input-bordered w-full "
              onChange={handleChange}
              name="fullname"
            />
          </div>
          <div>
            <label className="label py-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="input input-bordered w-full "
              onChange={handleChange}
              name="username"
            />
          </div>
          <div>
            <label className="label py-2">
              <span className="text-base label-text">Create Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered w-full "
              onChange={handleChange}
              name="password"
            />
          </div>

          <div>
            <label className="label py-2">
              <span className="text-base label-text">Gender</span>
            </label>
            <select
              onChange={handleChange}
              className="select select-bordered w-full"
              name="gender"
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-block btn-md text-xl mt-4 text-white font-bold flex justify-center items-center gap-2 bg-gradient-to-r hover:bg-gradient-to-l hover:opacity-85 py-2 px-3 rounded-md from-primary to-secondary disabled:text-white disabled:opacity-85"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Sign Up"
            )}
          </button>
          <Link
            to="/login"
            className="text-base w-full text-center hover:underline hover:text-primary mt-2 inline-block"
          >
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
