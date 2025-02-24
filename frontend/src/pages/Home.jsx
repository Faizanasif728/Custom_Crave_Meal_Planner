import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen pt-[4rem]">
      {/* Animated Text with a Futuristic Glow */}
      <motion.h1
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-extrabold text-center px-6 drop-shadow-lg"
      >
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Custom Your Cravings
        </span>
      </motion.h1>

      {/* Get Started Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        className="mt-6 w-full max-w-xs"
      >
        <Link
          to="/meal-planner"
          className="w-full flex items-center justify-center py-3 rounded-full shadow-lg text-white text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 focus:ring-4 focus:ring-blue-400"
        >
          Get Started
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
