import Mongoose from "mongoose";
// const cors = from "cors");
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

const app = express();
app.use(cors());
dotenv.config("");
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json({ limit: "30mb", extended: true }));
app.use(morgan("dev"));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// app.use(.bodyParser({ limit: "50mb" }));
import PostRoutes from "./Routes/PostRoutes.js";
import LikesRoutes from "./Routes/LikesRoutes.js";
import UserRoutes from "./Routes/UsersRoute.js";

app.use("/memory", PostRoutes);
app.use("/memory", LikesRoutes);
app.use("/memory", UserRoutes);

// app.post("/memory/signup", (req, res) => {
//   res.json("send data");
// });
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// cors must be used before your routes because it will block the paths if it is down
// always use cors middleware at the top

try {
  Mongoose.connect(process.env.LOCAL_DB).then(() => {
    app.listen(port, () => console.log(`Server runs on port ${port}`));
  });
} catch (error) {
  handleError(error);
}
