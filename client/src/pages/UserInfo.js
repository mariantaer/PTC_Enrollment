import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const savedData =
      location.state || JSON.parse(localStorage.getItem("pendingOrder"));
    if (savedData) {
      setCart(savedData.cart || []);
      setTotalPrice(savedData.totalPrice || 0);
    }
  }, [location.state]);

  // Cleanup pending order if component unmounts (optional)
  useEffect(() => {
    return () => {
      localStorage.removeItem("pendingOrder");
    };
  }, []);

  // ✅ FIXED: Define handleChange
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in all fields.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      // Save user info first to get userId
      const userResponse = await fetch("http://localhost:5000/save-user-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const userResult = await userResponse.json();

      if (!userResponse.ok) {
        alert(`Failed to save user info: ${userResult.error}`);
        return;
      }

      const userId = userResult.userId;

      // Now place the order with userId
      const orderData = {
      userId, // from /save-user-info
      products: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: totalPrice,
    };


      const orderResponse = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok) {
        alert(`Order failed: ${orderResult.error}`);
        return;
      }

      localStorage.removeItem("pendingOrder");

      navigate("/confirmation", {
        state: {
          userInfo: formData,
          cart,
          orderId: orderResult.orderId,
        },
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting the order.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h2 className="text-center mb-4">Enter Your Information</h2>
      <form className="bg-light p-4 rounded" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
            autoComplete="tel"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Delivery Address</label>
          <textarea
            name="address"
            className="form-control"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            required
            autoComplete="street-address"
          ></textarea>
        </div>

        <div className="text-center">
          <button className="btn btn-primary" type="submit">
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
