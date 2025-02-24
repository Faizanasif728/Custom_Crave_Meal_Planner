import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // TODO: Integrate with backend API
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
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(59,130,246,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-md shadow-lg text-white text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 focus:ring-4 focus:ring-blue-400"
          >
            Login
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
