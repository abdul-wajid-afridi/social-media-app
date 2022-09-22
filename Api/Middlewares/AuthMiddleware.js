import jwt from "jsonwebtoken";
const { verify } = jwt;
const protect = (req, res, next) => {
  // const accessToken = req.header("accessToken");
  const token = req.headers["token"];
  // const token = req.headers.authorization.split(" ")[1];
  if (!token) res.status(400).json({ message: "user not logged in" });
  try {
    // req.user = token;
    const validToken = verify(token, process.env.SECRETE_KEY);
    req.user = validToken;
    if (validToken) {
      next();
    }
  } catch (error) {
    res.status(400).json({
      message: "no token authorised error",
    });
  }
};
export default protect;
