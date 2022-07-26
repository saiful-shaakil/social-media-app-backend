const mongoose = required("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      min: 3,
      max: 20,
      unique: true,
      default: "",
    },
    fullName: {
      type: String,
      min: 5,
      max: 20,
      default: "",
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
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
    isAdmin: {
      type: Boolean,
      default: false,
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
