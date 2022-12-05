const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/db/dbConnect");
const usersRoute = require("./route/users/usersRoute");
dotenv.config();

const app = express();
//DB
dbConnect();

//Middleware
app.use(express.json());

//Users Route
app.use("/api/users", usersRoute);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
