import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";
import Ingredients from "./pages/IngredientsPage";
import MealPlanner from "./pages/MealPlannerPage";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Pages that use Layout */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/ingredients"
            element={
              <Layout>
                <Ingredients />
              </Layout>
            }
          />
          <Route
            path="/meal-planner"
            element={
              <Layout>
                <MealPlanner />
              </Layout>
            }
          />

          {/* Auth Pages (No Layout) */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>

      {/* ToastContainer for global toast notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
