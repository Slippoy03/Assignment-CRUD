const express = require("express");
const router = express.Router();
const db = require("../db");


router.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

router.get("/users/:id", (req, res) => {
  const query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});


router.post("/users", (req, res) => {
  const { name, email } = req.body;
  const query = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(query, [name, email], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id: result.insertId, name, email });
  });
});


router.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const query = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  db.query(query, [name, email, req.params.id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id: req.params.id, name, email });
  });
});


router.delete("/users/:id", (req, res) => {
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: "User deleted" });
  });
});

module.exports = router;
