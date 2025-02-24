import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black/90 backdrop-blur-lg text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
        {/* Left Section - Branding */}
        <div className="mb-6 md:mb-0">
          <Link
            to="/"
            className="text-3xl font-extrabold text-white tracking-wide hover:opacity-80 transition"
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
              Custom Crave
            </span>
          </Link>
          <p className="text-sm text-gray-400 mt-2 max-w-xs">
            Your futuristic AI-powered meal planner for Pakistan.
          </p>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <Link
              to="/about"
              className="block text-gray-400 hover:text-white transition"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block text-gray-400 hover:text-white transition"
            >
              Contact Us
            </Link>
          </div>
          <div className="space-y-2">
            <Link
              to="/privacy"
              className="block text-gray-400 hover:text-white transition"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="block text-gray-400 hover:text-white transition"
            >
              Terms of Use
            </Link>
          </div>
        </div>

        {/* Right Section - Social Links & Contact */}
        <div className="text-center md:text-right mt-6 md:mt-0">
          <div className="flex justify-center md:justify-end space-x-5 mb-3">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500 transition duration-300"
            >
              <FaFacebook className="text-2xl" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-pink-500 transition duration-300"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition duration-300"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-green-500 transition duration-300"
            >
              <FaWhatsapp className="text-2xl" />
            </a>
          </div>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=info@customcrave.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            info@customcrave.com
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        <p>© 2025 Custom Crave. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
