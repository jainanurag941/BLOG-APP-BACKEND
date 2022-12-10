const express = require("express");
const categoryRoute = express.Router();
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {
  createCategoryCtrl,
} = require("../../controllers/category/categoryCtrl");

categoryRoute.post("/", authMiddleware, createCategoryCtrl);

module.exports = categoryRoute;
