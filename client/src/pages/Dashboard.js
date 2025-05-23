import React from "react";
import { Link } from "react-router-dom";
import "../pages/styles.css";

const Dashboard = () => {
  return (
    <>


      <div className="container mt-5 text-center">
        <h1 className="mb-4">See Our Product</h1>

        <div className="row justify-content-center gap-3 mb-4">
          <div className="col-6 col-md-3">
            <Link to="/breads" className="text-decoration-none">
              <div className="card">
                <img
                  src="/img/Ensaymada.jpg"
                  className="card-img-top"
                  alt="Breads"
                />
                <div className="card-body">
                  <h5 className="card-title text-primary">Breads</h5>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-6 col-md-3">
            <Link to="/drinks" className="text-decoration-none">
              <div className="card">
                <img
                  src="/img/coffee.jpg"
                  className="card-img-top"
                  alt="Drinks"
                />
                <div className="card-body">
                  <h5 className="card-title text-success">Drinks</h5>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-6 col-md-3">
            <Link to="/desserts" className="text-decoration-none">
              <div className="card">
                <img
                  src="/img/cream.jpg"
                  className="card-img-top"
                  alt="Desserts"
                />
                <div className="card-body">
                  <h5 className="card-title text-warning">Desserts</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div>
          <Link to="/ordernow" className="btn btn-primary">
            Order Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
