import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios for API calls

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate(); // For redirecting after successful login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Set loading to true

    try {
      // Hardcoded API URL (as requested)
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );

      // Handle successful login
      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem("token", response.data.token);

        // Redirect to dashboard or home page
        navigate("/");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err); // Log full error for debugging

      setError(
        err.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Set loading back to false
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        {/* Heading */}
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white">
          Welcome Back
        </h2>

        {/* Display error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 text-white bg-transparent border border-gray-500 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all outline-none"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 text-white bg-transparent border border-gray-500 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all outline-none"
              required
            />
          </div>

          {/* Animated Login Button */}
          <motion.button
            disabled={loading}
            whileHover={{
              scale: loading ? 1 : 1.05,
              boxShadow: loading ? "none" : "0px 0px 15px rgba(59,130,246,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`w-full py-3 rounded-md shadow-lg text-white text-lg font-semibold ${
              loading
                ? "bg-gray-500 cursor-wait"
                : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-blue-500 hover:to-purple-600"
            } transition-all duration-300 focus:ring-4 focus:ring-blue-400`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* Signup Link */}
        <p className="mt-4 text-center text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
