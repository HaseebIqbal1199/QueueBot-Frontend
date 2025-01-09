import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const res = await axios.post("http://localhost:3200/auth/login", formData);
      localStorage.setItem("token", res.data.token); // Save token in localStorage
      navigate("/chat"); // Redirect to chat screen
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Show error message if any */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white text-lg mb-2"
            >
              Email
            </label>
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
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white text-lg mb-2"
            >
              Password
            </label>
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
          <button
            type="submit"
            className="w-full p-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-white">
            Don't have an account?{" "}
            <a href="/signup" className="text-sky-400 hover:text-sky-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;