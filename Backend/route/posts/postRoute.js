const express = require("express");
const postRoute = express.Router();
const {
  createPostCtrl,
  fetchPostsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  toggleAddLikeToPostCtrl,
  toggleAddDisLikeToPostCtrl,
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
postRoute.put("/likes", authMiddleware, toggleAddLikeToPostCtrl);
postRoute.put("/dislikes", authMiddleware, toggleAddDisLikeToPostCtrl);
postRoute.get("/", fetchPostsCtrl);
postRoute.get("/:id", fetchPostCtrl);
postRoute.put("/:id", authMiddleware, updatePostCtrl);
postRoute.delete("/:id", authMiddleware, deletePostCtrl);

module.exports = postRoute;
