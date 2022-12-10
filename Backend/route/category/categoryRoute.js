const express = require("express");
const categoryRoute = express.Router();
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {
  createCategoryCtrl,
  fetchCategoriesCtrl,
  fetchCategoryCtrl,
  updateCategoryCtrl,
} = require("../../controllers/category/categoryCtrl");

categoryRoute.post("/", authMiddleware, createCategoryCtrl);
categoryRoute.get("/", authMiddleware, fetchCategoriesCtrl);
categoryRoute.get("/:id", authMiddleware, fetchCategoryCtrl);
categoryRoute.put("/:id", authMiddleware, updateCategoryCtrl);

module.exports = categoryRoute;
