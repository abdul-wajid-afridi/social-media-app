import express from "express";
import {
  createUsers,
  getAllUsers,
  loginUser,
} from "../Controllers/UsersController.js";
const Router = express.Router();

Router.get("/getusers", getAllUsers);
Router.post("/signup", createUsers);
Router.post("/login", loginUser);

export default Router;
