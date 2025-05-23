import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    const storedOrder = JSON.parse(localStorage.getItem("orderSummary")) || {};

    setUserInfo(location.state?.userInfo || storedUserInfo);
    setCart(location.state?.cart || storedOrder.products || []);
  }, [location.state]);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleGoToConfirmPage = () => {
    navigate("/confirm");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2 className="text-center">Order Confirmation</h2>

      <div className="p-4 border rounded bg-light" style={{ backgroundColor: "#f8f9fa" }}>
        {userInfo.name ? (
          <>
            <h5>User Information</h5>
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Phone Number:</strong> {userInfo.phone || "Not provided"}</p>
            <p><strong>Address:</strong> {userInfo.address}</p>
          </>
        ) : (
          <p>No user information available.</p>
        )}

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table className="table" style={{ width: "100%", marginTop: 20, marginBottom: 20 }}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4 className="text-center">Total: ${totalPrice.toFixed(2)}</h4>
          </>
        )}
      </div>

      <div className="text-center" style={{ marginTop: 20 }}>
        <button className="btn btn-primary" onClick={handleGoToConfirmPage}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
