import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmPage = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/dashboard");  // Changed "/" to "/dashboard"
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600, margin: "0 auto", padding: 20, textAlign: "center" }}>
      <h2>Your order is on the way! 🚚</h2>
      <p>Thank you for your purchase. We’re preparing your order for delivery.</p>
      <button className="btn btn-primary mt-3" onClick={handleBackToDashboard}>
        Go Back to Dashboard
      </button>
    </div>
  );
};

export default ConfirmPage;
