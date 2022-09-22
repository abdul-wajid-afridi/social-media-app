import Express from "express";
import { LikePost } from "../Controllers/LikesController.js";
import protect from "../Middlewares/AuthMiddleware.js";
const Router = Express.Router();

Router.put("/posts/likes/:id", protect, LikePost);

export default Router;
