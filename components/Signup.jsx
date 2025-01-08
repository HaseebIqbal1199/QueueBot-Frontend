import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", username: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3200/auth/signup", formData);
      localStorage.setItem("token", res.data.token); // Save token in localStorage
      navigate("/chat"); // Redirect to chat screen
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white text-lg mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-3 bg-slate-900 text-white border-2 border-sky-600 rounded-lg outline-none focus:border-sky-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-lg mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 bg-slate-900 text-white border-2 border-sky-600 rounded-lg outline-none focus:border-sky-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white text-lg mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 bg-slate-900 text-white border-2 border-sky-600 rounded-lg outline-none focus:border-sky-400"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-white text-lg mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-3 bg-slate-900 text-white border-2 border-sky-600 rounded-lg outline-none focus:border-sky-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-white">
            Already have an account?{" "}
            <a href="/login" className="text-sky-400 hover:text-sky-500">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
