import Mongoose from "mongoose";
const PostSchema = Mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  creatorName: {
    type: String,
  },
  creatorId: {
    type: String,
  },
  tags: {
    type: [String],
    required: true,
  },
  selectedFile: {
    type: String,
  },
  likeCount: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const Posts = Mongoose.model("Posts", PostSchema);

export default Posts;
