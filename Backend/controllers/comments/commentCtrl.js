const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/Comment");

//Create comment
const createCommentCtrl = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const { postId, description } = req.body;

  try {
    const comment = await Comment.create({
      post: postId,
      user,
      description,
    });
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

//Fetch all comments
const fetchAllCommentsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({}).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.json(error);
  }
});

//Fetch a single comment
const fetchCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

module.exports = { createCommentCtrl, fetchAllCommentsCtrl, fetchCommentCtrl };
