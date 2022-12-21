const {
  createCommentCtrl,
  fetchAllCommentsCtrl,
  fetchCommentCtrl,
  updateCommentCtrl,
  deleteCommentCtrl,
} = require("../../controllers/comments/commentCtrl");
const express = require("express");
const commentRoute = express.Router();
const authMiddleware = require("../../middlewares/auth/authMiddleware");

commentRoute.post("/", authMiddleware, createCommentCtrl);
commentRoute.get("/", fetchAllCommentsCtrl);
commentRoute.get("/:id", authMiddleware, fetchCommentCtrl);
commentRoute.put("/:id", authMiddleware, updateCommentCtrl);
commentRoute.delete("/:id", authMiddleware, deleteCommentCtrl);

module.exports = commentRoute;
