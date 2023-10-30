const Post = require("../models/Post");
const User = require("../models/User");
const { cloudinary } = require("../utils/cloudinary");

const postController = {
  //CREATE A POST
  createPost: async (req, res) => {
    const users = await User.findById(req.body.userId);
    const makePost = {
      ...req.body,
      username: users.username,
      avaUrl: users.profilePicture,
      theme: users.theme,
    };
    const newPost = new Post(makePost);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE A POST
  updatePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id.trim());
      if (post.userId === req.body.userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("Post has been updated");
      } else {
        res.status(403).json("You can only update your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A POST
  deletePost: async (req, res) => {
      try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete post succesfully");
      } catch (err) {
        res.status(500).json(err);
      }
  },

  //GET ALL POST FROM A USER
  getPostsFromOne: async (req, res) => {
    try {
      const post = await Post.find({ userId: req.params.id });
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },

    //GET ALL POST FROM USER FOLLOWINGS
    getFriendsPost: async (req, res) => {
      try {
        const currentUser = await User.findById(req.body.userId);
        const userPost = await Post.find({ userId: req.body.userId });
        const friendPost = await Promise.all(
          currentUser.followings.map((friendId) => {
           return  Post.find({ userId: friendId });
          })
        );
        res.status(200).json(userPost.concat(...friendPost));
      } catch (err) {
        res.status(500).json(err);
      }
    },

  //GET ALL POSTS
  getAllPosts: async (req, res) => {
    try {
      res.status(200).json(res.paginatedResults);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPVOTE A POST
  upvotePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id.trim());
      if (!post.upvotes.includes(req.body.userId) && post.downvotes.includes(req.body.userId)) {
        await post.updateOne({ $push: { upvotes: req.body.userId } });
        await post.updateOne({ $pull: { downvotes: req.body.userId } });
        await User.findOneAndUpdate(
          { _id: post.userId },
          { $inc: { karmas: 10 } }
        );
       return res.status(200).json("Post is upvoted!");
      } else if (!post.upvotes.includes(req.body.userId) && !post.downvotes.includes(req.body.userId))
        {
        await post.updateOne({ $push: { upvotes: req.body.userId } });
        await User.findOneAndUpdate(
          { _id: post.userId },
          { $inc: { karmas: 10 } }
        );
        return res.status(200).json("Post is upvoted!");
      } else if (post.upvotes.includes(req.body.userId)) {
        await post.updateOne({ $pull: { upvotes: req.body.userId } });
        await User.findOneAndUpdate(
          { _id: post.userId },
          { $inc: { karmas: -10 } }
        );
        return es.status(200).json("Post is no longer upvoted!");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //DOWNVOTE POST
  downvotePost: async(req,res)=>{
    try {
      const post = await Post.findById(req.params.id.trim());
      if (!post.downvotes.includes(req.body.userId) && post.upvotes.includes(req.body.userId)) {
        await post.updateOne({ $push: { downvotes: req.body.userId } });
        await post.updateOne({ $pull: { upvotes: req.body.userId } });
        //POST OWNER LOSES KARMAS FROM THE DOWNVOTES
        await User.findOneAndUpdate(
          { _id: post.userId },
          { $inc: { karmas: -10 } }
        );
        return res.status(200).json("Post is downvoted!");
      }
      else if (!post.downvotes.includes(req.body.userId) && !post.upvotes.includes(req.body.userId)) {
        await post.updateOne({ $push: { downvotes: req.body.userId } });
        await User.findOneAndUpdate(
          { _id: post.userId },
          { $inc: { karmas: -10 } }
        );
        return res.status(200).json("Post is downvoted!");
      }
       else if (post.downvotes.includes(req.body.userId)) {
        await post.updateOne({ $pull: { downvotes: req.body.userId } });
        await User.findOneAndUpdate(
          { _id: post.userId },
          { $inc: { karmas: 10 } }
        );
        return res.status(200).json("Post is no longer downvoted!");
        }
      } catch (err) {
        return res.status(500).json(err);
      }
  },
  //ADD POST TO FAVORITE
  addFavoritePost: async (req, res) => {
    try {
      const user = await User.findById(req.body.userId);
      //if post is not in favorite yet
      if (!user.favorites.includes(req.params.id)) {
        await User.findByIdAndUpdate(
          { _id: req.body.userId },
          {
            $push: { favorites: req.params.id },
          },
          { returnDocument: "after" }
        );
        return res.status(200).json("added to favorites");
      } else {
        await User.findByIdAndUpdate(
          { _id: req.body.userId },
          {
            $pull: { favorites: req.params.id },
          }
        );
        return res.status(200).json("removed from favorites");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
   //GET FAVORITE POST
   getFavoritePosts: async (req, res) => {
    try {
      const currentUser = await User.findById(req.body.userId);
      const favoritePost = await Promise.all(
        currentUser.favorites.map((id) => {
          return Post.findById(id);
        })
      );
      res.status(200).json(favoritePost);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = postController;