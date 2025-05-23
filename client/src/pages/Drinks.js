import React from "react";
import { Link } from "react-router-dom";
import "../pages/styles.css";

const Drinks = () => {
  const products = [
    { id: 7, name: "Hot Chocolate", price: 3.5, image: "/img/hot.jpg" },
    { id: 8, name: "Classic Coffee", price: 4.5, image: "/img/coffee.jpg" },
    { id: 9, name: "Mocha Latte", price: 4.0, image: "/img/macha.jpg" },
    { id: 10, name: "Strawberry Milkshake", price: 5.75, image: "/img/straw.jpg" },
    { id: 11, name: "Milk", price: 2.0, image: "/img/milk.jpg" },
    { id: 12, name: "Iced Tea", price: 2.0, image: "/img/tea.jpg" },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Drinks</h2>

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

export default Drinks;
