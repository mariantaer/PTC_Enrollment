require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Database Connected!");
  }
});

// SIGNUP
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  db.query(
    "SELECT * FROM users_info WHERE email = ?",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error!" });

      if (results.length > 0) {
        return res.status(400).json({ error: "Email is already registered!" });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err)
          return res.status(500).json({ error: "Error hashing password" });

        const sql =
          "INSERT INTO users_info (name, email, password) VALUES (?, ?, ?)";
        db.query(sql, [name, email, hashedPassword], (err, result) => {
          if (err)
            return res.status(500).json({ error: "Internal Server Error" });

          res
            .status(201)
            .json({ message: "User signed up successfully!", userId: result.insertId });
        });
      });
    }
  );
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required!" });
  }

  db.query(
    "SELECT * FROM users_info WHERE email = ?",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid credentials!" });
      } else {
        const user = results[0];
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
          return res.status(401).json({ error: "Invalid credentials!" });
        }

        const token = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET || "secretkey",
          {
            expiresIn: "1h",
          }
        );

        return res.json({
          message: "Login successful!",
          token,
          id: user.id,
          name: user.name,
          email: user.email,
        });
      }
    }
  );
});

// SAVE USER INFO (additional details)
app.post("/save-user-info", (req, res) => {
  const { name, phone, address } = req.body;

  if (!name || !phone || !address) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = "INSERT INTO users (name, phone_number, address) VALUES (?, ?, ?)";
  db.query(sql, [name, phone, address], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(200).json({ message: "User info saved", userId: result.insertId });
  });
});

// ORDER SUMMARY (overall + details)
app.post('/api/orders', (req, res) => {
  const { userId, products, totalAmount } = req.body;

  if (!userId || !products || !Array.isArray(products) || !totalAmount) {
    return res.status(400).json({ error: "Missing or invalid order data" });
  }

  // Step 1: Insert into orders table
  const orderSql = `INSERT INTO orders (user_id, total_amount, created_at) VALUES (?, ?, NOW())`;

  db.query(orderSql, [userId, totalAmount], (err, orderResult) => {
    if (err) {
      console.error("❌ Error inserting into orders:", err);
      return res.status(500).json({ error: "Database error saving order summary" });
    }

    const orderId = orderResult.insertId;

    // Step 2: Insert into order_items table
    const orderItems = products.map((p) => [
      orderId,
      p.name,
      p.quantity,
      p.price * p.quantity,
      "Pending"
    ]);

    const itemsSql = `
      INSERT INTO order_items (order_id, product_name, quantity, subtotal, status)
      VALUES ?
    `;

    db.query(itemsSql, [orderItems], (err2) => {
      if (err2) {
        console.error("❌ Error inserting order items:", err2);
        return res.status(500).json({ error: "Database error saving order items" });
      }

      res.status(200).json({
        message: "✅ Order placed successfully",
        orderId,
      });
    });
  });
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
