import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/meal-bg.jpg')", // Updated background image
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="relative z-10 pt-20 pb-16">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
