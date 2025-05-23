import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleDelete = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleReduceQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    localStorage.setItem(
      "pendingOrder",
      JSON.stringify({ cart, totalPrice })
    );

    navigate("/user-info", { state: { cart, totalPrice } });
  };

  const handleBack = () => {
    navigate("/ordernow");
  };

  return (
    <div
      className="container mt-4"
      style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}
    >
      <h2 className="text-center">Order Summary</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="order-summary bg-light p-4 rounded">
          <table className="table" style={{ width: "100%", marginBottom: 20 }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>SubTotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleReduceQuantity(item.id)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className="text-center">Total: ${totalPrice.toFixed(2)}</h4>
          <div className="text-center" style={{ marginTop: 20 }}>
            <button className="btn btn-success me-2" onClick={handleCheckout}>
              Checkout
            </button>
            <button className="btn btn-secondary" onClick={handleBack}>
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
