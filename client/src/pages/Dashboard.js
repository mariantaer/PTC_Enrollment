import React from "react";
import { Link } from "react-router-dom";
import "../pages/styles.css";

const Dashboard = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">See Our Product</h1>

      <div className="d-flex justify-content-center gap-3 mb-4">
        <Link to="/breads" className="btn btn-outline-primary">Breads</Link>
        <Link to="/drinks" className="btn btn-outline-success">Drinks</Link>
        <Link to="/desserts" className="btn btn-outline-warning">Desserts</Link>
      </div>

      {/* Order Now Button */}
      <div>
        <Link to="/ordernow" className="btn btn-primary">
          Order Now
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
