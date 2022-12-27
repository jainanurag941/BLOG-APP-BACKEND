const Post = require("../../model/post/Post");
const User = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");
const validateMongodbId = require("../../utils/validateMongodbID");
const Filter = require("bad-words");
const fs = require("fs");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const blockUser = require("../../utils/blockUser");

//Create Post
const createPostCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  validateMongodbId(_id);

  blockUser(req?.user);

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
  const hasCategory = req.query.category;
  try {
    if (hasCategory) {
      const posts = await Post.find({ category: hasCategory })
        .populate("user")
        .populate("comments")
        .sort("-createdAt");

      res.json(posts);
    } else {
      const posts = await Post.find({})
        .populate("user")
        .populate("comments")
        .sort("-createdAt");

      res.json(posts);
    }
  } catch (error) {
    res.json(error);
  }
});

//Fetch a single post
const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const post = await Post.findById(id)
      .populate("user")
      .populate("disLikes")
      .populate("likes")
      .populate("comments");

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

//Update posts
const updatePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        ...req.body,
        user: req.user?._id,
      },
      {
        new: true,
      }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//Delete post
const deletePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const post = await Post.findByIdAndDelete(id);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//Likes
const toggleAddLikeToPostCtrl = expressAsyncHandler(async (req, res) => {
  //1. Find the post to be liked
  const { postId } = req.body;
  let post = await Post.findById(postId);
  //2. Find the login user
  const loginUserId = req?.user?.id;
  //3. Find if this user has liked this post
  const isLiked = post?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  //4. Check if this user has disliked this post
  const alreadyDisliked = post?.disLikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  //5. Remove the user from dislikes array if exists
  if (alreadyDisliked) {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
      },
      {
        new: true,
      }
    );
  }

  if (isLiked) {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
      },
      {
        new: true,
      }
    );
  } else {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      {
        new: true,
      }
    );
  }
  res.json(post);
});

//DisLikes
const toggleAddDisLikeToPostCtrl = expressAsyncHandler(async (req, res) => {
  //1. Find the post to be liked
  const { postId } = req.body;
  let post = await Post.findById(postId);
  //2. Find the login user
  const loginUserId = req?.user?.id;
  //3. Find if this user has liked this post
  const alreadyLiked = post?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  //4. Check if this user has disliked this post
  const isDisliked = post?.disLikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  //5. Remove the user from dislikes array if exists
  if (alreadyLiked) {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
      },
      {
        new: true,
      }
    );
  }

  if (isDisliked) {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
      },
      {
        new: true,
      }
    );
  } else {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { disLikes: loginUserId },
      },
      {
        new: true,
      }
    );
  }
  res.json(post);
});

module.exports = {
  createPostCtrl,
  fetchPostsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  toggleAddLikeToPostCtrl,
  toggleAddDisLikeToPostCtrl,
};
