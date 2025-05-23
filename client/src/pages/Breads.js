import React from "react";
import { Link } from "react-router-dom";
import "../pages/styles.css";

const Breads = () => {
  const products = [
    { id: 1, name: "Banana Bread", price: 5.0, image: "/img/Banana Bread.jpg" },
    { id: 2, name: "Baguette", price: 4.0, image: "/img/bagguette.jpg" },
    { id: 3, name: "Ensaymada", price: 2.5, image: "/img/Ensaymada.jpg" },
    { id: 4, name: "Ham and Cheese Bread", price: 8.75, image: "/img/cheese.jpg" },
    { id: 5, name: "Fresh Bread", price: 4.0, image: "/img/tasty.jpg" },
    { id: 6, name: "Chocolate Brownie", price: 3.5, image: "/img/Chocolate Brownie.jpg" },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Breads</h2>

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 col-sm-6 mb-4">
            <div className="card product-card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link to="/dashboard" className="btn btn-secondary">← Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default Breads;
