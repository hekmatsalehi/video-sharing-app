import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_SECRET)
    .then(() => console.log("connected to database!"))
    .catch((error) => {
      throw error;
    });
};

app.use(cookieParser());
// allow the app to take json
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Ohh something went wrong!";

  return res.status(status).json({
    success: false,
    status,
    message,
  })
})

app.listen(5010, () => {
  connect();
  console.log("server is running!");
});
