import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONOGOSECRET)
    .then(() => console.log("connected to database!"))
    .catch((error) => {
      throw error;
    });
};
// allow the app to take json
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

app.listen(5010, () => {
  connect();
  console.log("server is running!");
});
