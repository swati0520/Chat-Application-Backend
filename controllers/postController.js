let PostCollection = require("../models/PostModel");

const createPost = async (req, res) => {
  let { title, description, file } = req.body;
  let _id = req.user;
  try {
    let data = await PostCollection.create({
      title,
      description,
      file,
      userId: _id,
    });

    res.json({ msg: "post created successfully", success: true });
  } catch (error) {
    res.json({
      msg: "error in creating post",
      success: false,
      error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  let postId = req.params;
  let { title, description } = req.body;
  try {
    let post = await PostCollection.findByIdAndUpdate(postId, {
      title,
      description,
    });
    res.json({ msg: "post update successfully", success: true });
  } catch (error) {
    res.json({
      msg: "error in updating post",
      success: false,
      error: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  let postId = req.params;
  try {
    let post = await PostCollection.findByIdAndDelete(postId);
    res.json({ msg: "post delete successfully", success: true });
  } catch (error) {
    res.json({
      msg: "error in deleting",
      success: false,
      error: error.message,
    });
  }
};

const getAllPost = async (req, res) => {
  // res.send("show all post  running")
  try {
    let post = await PostCollection.find()
      .sort({ createdAt: -1 })
      .populate({ path: "userId", select: "name profilePic" })
      .populate({
        path: "comments",
        populate: { path: "user", select: "name profilePic" },
      });
    res.json({ msg: "all data fetched successfully", success: true, post });
  } catch (error) {
    res.json({
      msg: "error in geting all posts",
      success: false,
      error: error.message,
    });
  }
};

const getYourPost = async (req, res) => {
  try {
    let userId = req.user;
    let post = await PostCollection.find({ userId: userId }).populate("userId");
    res.json({ msg: "post get successfully", success: true, post });
  } catch (error) {
    res.json({
      msg: "error in geting user post",
      success: error,
      error: error.message,
    });
  }
};
const getFriendPost = async (req, res) => {
  let id = req.params._id;
  try {
    let posts = await PostCollection.find({ userId: id });
    res.json({ msg: "post get successfull", success: true, posts });
  } catch (error) {
    res.json({
      msg: "error in getting posts",
      success: false,
      error: error.message,
    });
  }
};

const commentsPost = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user;
    const postId = req.params.postId;

    let post = await PostCollection.findById(postId);
    post.comments.push({ user: userId, text });
    await post.save();
    res.json({ msg: "post commented successfully", success: true });
  } catch (error) {
    res.json({
      msg: "error in comment post",
      success: false,
      error: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  let { commentId, postId } = req.params;

  try {
    let post = await PostCollection.findById(postId);

    let filterdArr = post.comments.filter(
      (ele) => ele._id.toString() !== commentId
    );
    post.comments = filterdArr;
    await post.save();

    res.json({ msg: "comment deleted successfully", success: true });
  } catch (error) {
    res.json({
      msg: "error in  deleting post ",
      success: false,
      error: error.message,
    });
  }
};
const likesorDislike = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user;

  try {
    let post = await PostCollection.findById(postId);
    if (!post.like.includes(userId)) {
      post.like.push(userId);
      await post.save();
      res.json({ msg: "post liked successfully", success: true });
    } else {
      post.like.pull(userId);

      await post.save();

      res.json({ msg: "post disliked successfully", success: true });
    }
  } catch (error) {
    res.json({ msg: "error in like", success: false, error: error.message });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPost,
  getYourPost,
  getFriendPost,
  commentsPost,
  deleteComment,
  likesorDislike,
};
