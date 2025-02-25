import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen pt-[4rem] px-4">
      {/* Animated Text with a Futuristic Glow */}
      <motion.h1
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-extrabold text-center drop-shadow-lg"
      >
        <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          Custom Your Cravings,
        </span>
        <br></br>
        <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          The Pakistani Way!
        </span>
      </motion.h1>

      {/* Get Started Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        className="mt-8"
      >
        <Link
          to="/meal-planner"
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          Get Started
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
