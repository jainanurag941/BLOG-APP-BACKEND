const { createCommentCtrl } = require("../../controllers/comments/commentCtrl");
const express = require("express");
const commentRoute = express.Router();
const authMiddleware = require("../../middlewares/auth/authMiddleware");

commentRoute.post("/", authMiddleware, createCommentCtrl);

module.exports = commentRoute;
