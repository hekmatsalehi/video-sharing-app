import express from "express";
import { addVideo, addView, deleteVideo, getByTag, getRandomVideos, getVideo, searchVideos, subscribedVideos, trend, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Create a video
router.post("/", verifyToken, addVideo)

// Update a video
router.put("/:id", verifyToken, updateVideo)

// Delete a video
router.delete("/:id", verifyToken, deleteVideo)

// Get a video
router.get("/find/:id", getVideo)

// Update video view
router.put("/view/:id", addView )

// Get trend videos
router.get("/trend", trend)

// Get random videos
router.get("/random", getRandomVideos)

// Get subscribed channel videos
router.get("/sub", verifyToken, subscribedVideos )

// Get videos by tags
router.get("/tags", getByTag)

// Query videos based on any word in the title of the video
router.get("/search", searchVideos)



export default router;