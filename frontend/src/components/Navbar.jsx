import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-lg shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-white tracking-wide"
        >
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
            CustomCrave
          </span>
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center">
          {["Home", "Meal Planner", "Ingredients", "About", "Contact"].map(
            (item) => (
              <li key={item}>
                <Link
                  to={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(" ", "-")}`
                  }
                  className="text-gray-300 hover:text-white text-lg transition duration-300"
                >
                  {item}
                </Link>
              </li>
            )
          )}
          {/* Signup & Login Buttons */}
          <li>
            <Link
              to="/signup"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg transform hover:scale-105 transition duration-300"
            >
              Signup
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full shadow-lg transform hover:scale-105 transition duration-300"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden absolute left-0 top-full w-full bg-black/90 backdrop-blur-lg shadow-xl">
          {["Home", "Meal Planner", "Ingredients", "About", "Contact"].map(
            (item) => (
              <li key={item} className="p-4 border-b border-gray-700">
                <Link
                  to={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(" ", "-")}`
                  }
                  className="text-gray-300 hover:text-white text-lg block text-center"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            )
          )}
          {/* Signup & Login Links */}
          <li className="p-4">
            <Link
              to="/signup"
              className="block text-center text-white bg-gradient-to-r from-blue-500 to-purple-600 py-2 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Signup
            </Link>
          </li>
          <li className="p-4">
            <Link
              to="/login"
              className="block text-center text-white bg-gradient-to-r from-purple-600 to-blue-500 py-2 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
