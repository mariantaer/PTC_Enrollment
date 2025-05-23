import React from "react";
import { Link } from "react-router-dom";   // <-- import Link
import "../pages/styles.css";

const Desserts = () => {
  const products = [
    { id: 13, name: "Mousse Cake", price: 10.0, image: "/img/cake.jpg" },
    { id: 14, name: "Bibingka", price: 3.0, image: "/img/bibingka.jpg" },
    { id: 15, name: "Leche Flan", price: 10.0, image: "/img/Leche Flan.jpg" },
    { id: 16, name: "Ice Cream", price: 8.75, image: "/img/cream.jpg" },
    { id: 17, name: "Mango Graham", price: 4.0, image: "/img/graham.jpg" },
    { id: 18, name: "Chocolate Cookie", price: 5.0, image: "/img/cookie.jpg" },
  ];

  return (
    <div className="container mt-4">
      <h2>Desserts</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 col-sm-6">
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

      {/* Go Back Button */}
      <div className="text-center mt-4">
        <Link to="/dashboard" className="btn btn-secondary">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Desserts;
