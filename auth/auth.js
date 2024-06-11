const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

const secret = process.env.JWT_SECRET; 


router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ message: "User registered successfully" });
  });
});


router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 }); // 24 hours
    res.status(200).send({ auth: true, token: token });
  });
});

module.exports = router;