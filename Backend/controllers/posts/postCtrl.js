const Post = require("../../model/post/Post");
const User = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");
const validateMongodbId = require("../../utils/validateMongodbID");
const Filter = require("bad-words");
const fs = require("fs");
const cloudinaryUploadImg = require("../../utils/cloudinary");

//Create Post
const createPostCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(req.body.user);

  const filter = new Filter();
  const isProfane = filter.isProfane(req.body.title, req.body.description);

  if (isProfane) {
    const user = await User.findByIdAndUpdate(_id, {
      isBlocked: true,
    });
    throw new Error(
      "Creating Failed because it contains profane words and you have been blocked"
    );
  }

  //1. Get the path to img
  const localPath = `public/images/posts/${req.file.filename}`;

  //2. Upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath);

  try {
    const post = await Post.create({
      ...req.body,
      image: imgUploaded?.url,
      user: _id,
    });
    res.json(post);

    //Remove uploaded images
    fs.unlinkSync(localPath);
  } catch (error) {
    res.json(error);
  }
});

//Fetch all posts
const fetchPostsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user");
    res.json(posts);
  } catch (error) {
    res.json(error);
  }
});

//Fetch a single post
const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const post = await Post.findById(id).populate("user");

    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

module.exports = { createPostCtrl, fetchPostsCtrl, fetchPostCtrl };
