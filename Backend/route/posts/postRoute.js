const express = require("express");
const postRoute = express.Router();
const { createPostCtrl } = require("../../controllers/posts/postCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

postRoute.post("/", authMiddleware, createPostCtrl);

module.exports = postRoute;
