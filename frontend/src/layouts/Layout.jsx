import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 pt-16">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
