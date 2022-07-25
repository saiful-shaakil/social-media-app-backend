const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  caption: {
    type: String,
    max: 500,
  },
  image: {
    type: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Post", PostSchema);
