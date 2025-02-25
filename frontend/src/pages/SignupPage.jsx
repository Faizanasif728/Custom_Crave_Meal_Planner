import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios for API calls

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State to track API call
  const navigate = useNavigate(); // For redirecting after successful signup

  // Handle input changes and update state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Set loading state

    try {
      // Send signup request to backend
      const response = await axios.post(
        "http://localhost:3000/api/users/create-user",
        formData
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/"); // Redirect to home page
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err.response || err);
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Reset loading state
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
          Create an Account
        </h2>

        {/* Display error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-gray-300 font-semibold mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 text-white bg-transparent border border-gray-500 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all outline-none"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-gray-300 font-semibold mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 text-white bg-transparent border border-gray-500 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all outline-none"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-gray-300 font-semibold mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 text-white bg-transparent border border-gray-500 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all outline-none"
              required
            />
            <p className="mt-2 text-sm text-gray-400">
              Password must be at least 8 characters, with one uppercase letter,
              one number, and one special character.
            </p>
          </div>

          {/* Animated Sign Up Button */}
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
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-blue-500 hover:to-purple-600"
            } transition-all duration-300 focus:ring-4 focus:ring-blue-400`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </motion.button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
