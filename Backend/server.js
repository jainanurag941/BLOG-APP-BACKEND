const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/db/dbConnect");
dotenv.config();

const app = express();
//DB
dbConnect();

//Register
app.post("/api/users/register", (req, res) => {
  res.json({ user: "User Registered" });
});

//Login
app.post("/api/users/login", (req, res) => {
  res.json({ user: "User Logged In" });
});

//Fetch all users
app.get("/api/users", (req, res) => {
  res.json({ user: "fetch all users" });
});

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
