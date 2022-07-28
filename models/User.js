const mongoose = require("mongoose");

// username: {
//   type: String,
//   min: 3,
//   max: 20,
//   unique: true,
//   default: "",
// },
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
    },
    fullName: {
      type: String,
      min: 5,
      max: 20,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    posts: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    sentRequest: {
      type: String,
      default: "",
    },
    requestList: {
      type: Array,
      default: [],
    },
    friendsList: {
      type: Array,
      default: [],
    },
    bio: {
      type: String,
      max: 50,
      default: "",
    },
    city: {
      type: String,
      max: 50,
      default: "",
    },
    from: {
      type: String,
      max: 50,
      default: "",
    },
  },
  { timestamps: true },
  { collection: "users" }
);

module.exports = mongoose.model("User", UserSchema);
