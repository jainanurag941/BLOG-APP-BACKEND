const {
  createCommentCtrl,
  fetchAllCommentsCtrl,
  fetchCommentCtrl,
} = require("../../controllers/comments/commentCtrl");
const express = require("express");
const commentRoute = express.Router();
const authMiddleware = require("../../middlewares/auth/authMiddleware");

commentRoute.post("/", authMiddleware, createCommentCtrl);
commentRoute.get("/", authMiddleware, fetchAllCommentsCtrl);
commentRoute.get("/:id", authMiddleware, fetchCommentCtrl);

module.exports = commentRoute;
