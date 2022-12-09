const {
  createCommentCtrl,
  fetchAllCommentsCtrl,
  fetchCommentCtrl,
  updateCommentCtrl,
} = require("../../controllers/comments/commentCtrl");
const express = require("express");
const commentRoute = express.Router();
const authMiddleware = require("../../middlewares/auth/authMiddleware");

commentRoute.post("/", authMiddleware, createCommentCtrl);
commentRoute.get("/", authMiddleware, fetchAllCommentsCtrl);
commentRoute.get("/:id", authMiddleware, fetchCommentCtrl);
commentRoute.put("/:id", authMiddleware, updateCommentCtrl);

module.exports = commentRoute;
