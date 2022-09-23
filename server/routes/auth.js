import express from "express";
import { login, signup } from "../controllers/auth.js";

const router = express.Router();

// Create a user
router.post("/signup", signup)
// login
router.post("/login", login)
// Google auth
router.post("google")

export default router;