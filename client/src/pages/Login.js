// Login.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = "http://localhost:5000";
      const url = isLogin ? `${baseUrl}/login` : `${baseUrl}/signup`;
      const data = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await axios.post(url, data);

      if (!isLogin) {
        alert(res.data.message);
        setIsLogin(true);
        return;
      }

      const { id, token, name, email } = res.data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify({ id, name, email }));

      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 300, margin: "auto", padding: 20 }}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ display: "block", width: "100%", marginBottom: 10 }}
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ display: "block", width: "100%", marginBottom: 10 }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ display: "block", width: "100%", marginBottom: 10 }}
          />
          <button type="submit" style={{ width: "100%" }}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p style={{ marginTop: 15, textAlign: "center" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </>
  );
};

export default Login;
