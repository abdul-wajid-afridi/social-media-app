import Users from "../Models/UserModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const data = await Users.find();
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      error: error.message,
    });
  }
};

export const createUsers = async (req, res) => {
  const { password, name, email } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const data = await Users.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "fail", message: "please enter email or password" });
  }
  try {
    const user = await Users.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ status: "fail", message: "wrong credentials" });

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      return res
        .status(400)
        .json({ status: "fail", message: "wrong credentials" });

    const token = jwt.sign(
      { name: user.email, id: user._id },
      process.env.SECRETE_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ result: user, token });
  } catch (error) {
    res.json({
      status: "failed",
      message: "some thing went wrong",
    });
    console.log(error);
  }
};
