import React from "react";
import ProductList from "../components/ProductList";
import './styles.css';

const OrderNow = ({ addToCart }) => {
  return (
    <div className="container mt-4">
      <ProductList addToCart={addToCart} />
    </div>
  );
};

export default OrderNow;
