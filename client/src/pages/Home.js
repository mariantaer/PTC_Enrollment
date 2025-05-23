import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="title">
        <h1 className="text-white">Fresh Loaf</h1>
      </div>
      <div className="quote">
        <h2 className="text-white">"Freshly baked, the best bread in town!"</h2>
      </div>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    </div>
  );
};

export default Home;
