const express = require("express");
const postRoute = express.Router();
const {
  createPostCtrl,
  fetchPostsCtrl,
  fetchPostCtrl,
} = require("../../controllers/posts/postCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {
  photoUpload,
  postImgResize,
} = require("../../middlewares/uploads/photoUpload");

postRoute.post(
  "/",
  authMiddleware,
  photoUpload.single("image"),
  postImgResize,
  createPostCtrl
);
postRoute.get("/", fetchPostsCtrl);
postRoute.get("/:id", fetchPostCtrl);

module.exports = postRoute;
