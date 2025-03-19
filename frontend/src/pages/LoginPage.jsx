import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../api";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/auth/login", formData, {
        withCredentials: true,
      });

      console.log("API Response:", data); // Log the API response for debugging

      if (data?.success) {
        toast.success("Login successful!");
        setFormData({ email: "", password: "" }); //  Clear inputs on success
        navigate("/"); //  Redirect to home page
      } else {
        toast.error(data?.message || "Invalid login credentials.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
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
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-gray-300 font-semibold mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email here"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-white bg-transparent border border-gray-500 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all outline-none"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-300 font-semibold mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password here"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-white bg-transparent border border-gray-500 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all outline-none"
            />
          </div>
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
