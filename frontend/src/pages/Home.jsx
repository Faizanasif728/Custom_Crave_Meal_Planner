// src/pages/Home.jsx
import React from "react";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to Custom Crave Meal Planner</h1>
        <p>Plan your meals based on your dietary needs and weight goals.</p>
        <button className="cta-button">Get Started</button>
      </header>
    </div>
  );
};

export default Home;
