import React from "react";
import { motion } from "framer-motion";

const MealPlanner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-6">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-extrabold text-center drop-shadow-lg"
      >
        <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          Plan Your Meals
        </span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
        className="mt-4 text-lg md:text-xl text-gray-300 text-center max-w-2xl"
      >
        Create your personalized meal plan in seconds!
      </motion.p>
    </div>
  );
};

export default MealPlanner;
