const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/Comment");
const blockUser = require("../../utils/blockUser");
const validateMongodbId = require("../../utils/validateMongodbID");

//Create comment
const createCommentCtrl = expressAsyncHandler(async (req, res) => {
  const user = req.user;

  blockUser(user);

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
  validateMongodbId(id);
  try {
    const comment = await Comment.findById(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

//Update
const updateCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const { description } = req?.body;
  try {
    const update = await Comment.findByIdAndUpdate(
      id,
      {
        user: req.user,
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(update);
  } catch (error) {
    res.json(error);
  }
});

//Delete
const deleteCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createCommentCtrl,
  fetchAllCommentsCtrl,
  fetchCommentCtrl,
  updateCommentCtrl,
  deleteCommentCtrl,
};
