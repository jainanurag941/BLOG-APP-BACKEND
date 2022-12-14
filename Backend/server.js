const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require("./config/db/dbConnect");
const usersRoute = require("./route/users/usersRoute");
const postRoute = require("./route/posts/postRoute");
const commentRoute = require("./route/comments/commentRoute");
const emailMsgRoute = require("./route/emailMsg/emailMsgRoute");
const categoryRoute = require("./route/category/categoryRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
dotenv.config();

const app = express();
//DB
dbConnect();

//Middleware
app.use(express.json());
app.use(cors());

//Users Route
app.use("/api/users", usersRoute);

//Post Route
app.use("/api/posts", postRoute);

//Comment Route
app.use("/api/comments", commentRoute);

//Email Msg Route
app.use("/api/email", emailMsgRoute);

//Category Route
app.use("/api/category", categoryRoute);

//err handler
app.use(notFound);
app.use(errorHandler);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
