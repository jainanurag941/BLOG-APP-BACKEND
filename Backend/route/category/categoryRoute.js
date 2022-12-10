const express = require("express");
const categoryRoute = express.Router();
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {
  createCategoryCtrl,
  fetchCategoriesCtrl,
} = require("../../controllers/category/categoryCtrl");

categoryRoute.post("/", authMiddleware, createCategoryCtrl);
categoryRoute.get("/", authMiddleware, fetchCategoriesCtrl);

module.exports = categoryRoute;
