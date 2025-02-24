import React from "react";
import { motion } from "framer-motion";

const Ingredients = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Animated Heading with Gradient & Glow */}
      <motion.h1
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-extrabold text-center px-6 drop-shadow-lg"
      >
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Ingredients
        </span>
      </motion.h1>

      {/* Subtext with Animation */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
        className="mt-3 text-lg md:text-xl text-gray-300 max-w-lg text-center"
      >
        Discover the freshest and healthiest ingredients tailored for your meal
        plans.
      </motion.p>
    </div>
  );
};

export default Ingredients;
