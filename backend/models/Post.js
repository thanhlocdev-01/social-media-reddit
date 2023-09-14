const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlegth: 10,
      maxlegth: 100,
    },
    description: {
      type: String,
      required: true,
      minlegth: 10,
    },
    tags: {
      type: Number,
      required: true,
      default: 0,
    },
    upvotes: {
      type: Array,
      default: [],
    },
    downvotes: {
      type: Array,
      default: [],
    },
    comments: [{
      content:String,
      ownerId:String, 
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post",postSchema);