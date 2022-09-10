import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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
app.listen(5010, () => {
  connect();
  console.log("server is running!");
});
