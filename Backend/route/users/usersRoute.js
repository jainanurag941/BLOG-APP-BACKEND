const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  fetchUsersCtrl,
  deleteUsersCtrl,
} = require("../../controllers/users/usersCtrl");
const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", userLoginCtrl);
userRoutes.get("/", fetchUsersCtrl);
userRoutes.delete("/:id", deleteUsersCtrl);

module.exports = userRoutes;
