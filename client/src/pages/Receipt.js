import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReceiptPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const [cart, setCart] = useState([]);
  const [orderDate, setOrderDate] = useState("");

  useEffect(() => {
    setUserInfo(location.state?.userInfo || {});
    setCart(location.state?.cart || []);

    const now = new Date();
    const formattedDate = now.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
    setOrderDate(formattedDate);
  }, [location.state]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>No order details available.</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/order-now")}>
          Go to Order Now
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-5" style={{ maxWidth: 600, border: "1px solid #ddd", padding: 30, borderRadius: 8, backgroundColor: "#fff" }}>
        <h2 className="text-center mb-4">Receipt</h2>

        <section style={{ marginBottom: 20 }}>
          <h5>Order Details</h5>
          <p><strong>Date:</strong> {orderDate}</p>
          <p><strong>Name:</strong> {userInfo.name || "N/A"}</p>
          <p><strong>Phone:</strong> {userInfo.phone || "N/A"}</p>
          <p><strong>Address:</strong> {userInfo.address || "N/A"}</p>
        </section>

        <section>
          <table className="table">
            <thead>
              <tr style={{ borderBottom: "2px solid #000" }}>
                <th>Item</th>
                <th className="text-end">Price</th>
                <th className="text-center">Qty</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(({ id, name, price, quantity }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td className="text-end">${price.toFixed(2)}</td>
                  <td className="text-center">{quantity}</td>
                  <td className="text-end">${(price * quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "2px solid #000" }}>
                <td colSpan={3} className="text-end fw-bold">Total:</td>
                <td className="text-end fw-bold">${totalPrice.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </section>
      </div>

      {/* Dashboard Button Outside Container */}
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    </>
  );
};

export default ReceiptPage;
