const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const db = require("./db");
const routes = require("./routes");
const authRoutes = require("./auth/auth");
const verifyToken = require("./auth/middleware");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);
app.use("/auth", authRoutes);
app.use("/api/users", verifyToken);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

authRoutes.post("/register", (req, res) => {
  console.log("Received registration request");
  const { name, email, password } = req.body;
  console.log("Request body:", req.body);

  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, hashedPassword], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send(err);
    }
    console.log("User registered successfully");
    res.status(201).send({ message: "User registered successfully" });
  });
});