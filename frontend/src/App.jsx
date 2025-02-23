import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Ingredients from "./pages/Ingredients";
import MealPlanner from "./pages/MealPlanner";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
