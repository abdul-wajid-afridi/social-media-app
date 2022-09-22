import Express from "express";
import {
  getAllPosts,
  createPosts,
  deletePosts,
  updatePost,
  getUserPosts,
  getRelatedPosts,
  getSearchedPosts,
} from "../Controllers/PostController.js";
import protect from "../Middlewares/AuthMiddleware.js";
const Router = Express.Router();

Router.get("/posts", getAllPosts);
Router.post("/posts", protect, createPosts);
Router.post("/posts/relatedPosts", getRelatedPosts);
Router.post("/posts/search", getSearchedPosts);
Router.delete("/posts/:id", protect, deletePosts);
Router.put("/posts/:id", protect, updatePost);
Router.get("/userPosts/:id", protect, getUserPosts);
// Router.get("/userPosts", protect, getUserPosts);

export default Router;
