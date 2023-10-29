const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlegth: 6,
      maxlegth: 20,
      unique: true,
    },
    displayName: {
      type: String,
      default: "New User",
    },
    age: {
      type: Number,
      minlegth: 14,
      default: 99
    },
    email: {
      type: String,
      required: true,
      maxlegth: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minleght: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    profilePicture: {
      type: String,
      default:
        "https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a",
    },
    theme: {
      type: String,
      default: "#ff9051",
    },
    karmas: {
      type: Number,
      default: 0,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    favorites:{
      type:Array,
      default:[],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);