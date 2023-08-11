const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
      min: 10,
      max: 100,
    },
    description: {
      type: String,
      require: true,
      min: 10,
    },
    tags: {
      type: Number,
      require: true,
      default: 0,
    },
    upvotes: {
      type: Array,
      default: [],
    },
    dowvotes: {
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