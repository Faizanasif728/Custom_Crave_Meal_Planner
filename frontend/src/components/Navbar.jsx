import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          CustomCrave
        </Link>

        {/* Hamburger Icon */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {["Home", "Meal Planner", "Ingredients", "About", "Contact"].map(
            (item) => (
              <li key={item}>
                <Link
                  to={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(" ", "-")}`
                  }
                  className="text-gray-600 hover:text-gray-900"
                >
                  {item}
                </Link>
              </li>
            )
          )}
          {/* ✅ Add Signup & Login Links */}
          <li>
            <Link to="/signup" className="text-blue-600 hover:text-blue-900">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-blue-600 hover:text-blue-900">
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Dropdown */}
        {isOpen && (
          <ul className="md:hidden absolute left-0 top-14 w-full bg-white shadow-lg">
            {["Home", "Meal Planner", "Ingredients", "About", "Contact"].map(
              (item) => (
                <li key={item} className="p-3 border-b">
                  <Link
                    to={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace(" ", "-")}`
                    }
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
            {/* ✅ Add Signup & Login Links to Mobile Menu */}
            <li className="p-3 border-b">
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-900"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
            </li>
            <li className="p-3">
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-900"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
