import React from "react";
import { motion } from "framer-motion";

const MealPlanner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Animated Text with a Futuristic Glow */}
      <motion.h1
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-extrabold text-center px-6 drop-shadow-lg"
      >
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Plan Your Meals
        </span>
      </motion.h1>

      {/* Animated Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
        className="mt-3 text-lg md:text-xl text-gray-200"
      >
        Create your personalized meal plan in seconds!
      </motion.p>
    </div>
  );
};

export default MealPlanner;
