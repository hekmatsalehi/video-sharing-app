import { createError } from "../error.js"
import Video from "../models/Video.js"
import User from "../models/User.js"

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body })
    try {
        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo)
    } catch (error) {
        next(error)
    }
}

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video) {
            return next(createError(404, "Video not found!"))
        }
        if(req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(updatedVideo)
        } else {
            return next(createError(403, "You can only update your own video!")) 
        }
    } catch (error) {
        next(error)
    }
}

export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video) {
            return next(createError(404, "Video not found!"))
        }
        if(req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("The video is deleted!")
        } else {
            return next(createError(403, "You can only update your own video!")) 
        }
    } catch (error) {
        next(error)
    }
}

export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
}

export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id), {
            $inc: { views: 1 }
        }
        res.status(200).json("View is increased successfully!")
    } catch (error) {
        next(error)
    }
}

export const getRandomVideos = async (req, res, next) => {
    try {
        // MongoDB aggregate method give us 40 random videos
        const randomVideos = await Video.aggregate([
            { $sample: { size: 40 }}
        ])
        res.status(200).json(randomVideos)
    } catch (error) {
        next(error)
    }
}

export const trend = async (req, res, next) => {
    try {
        // sort the videos based on more views
        const moreViewedVideos = await Video.find().sort({ views: -1 });
        res.status(200).json(moreViewedVideos)
    } catch (error) {
        next(error)
    }
}

export const subscribedVideos = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers

       const list = await Promise.all(
        subscribedChannels.map(channelId => {
            return Video.find({ userId: channelId })
        })
       );
       //remove nested array and sort it by newest video
       res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt)) 

    } catch (error) {
        next(error)
    }
}

export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",")
    try {
        const videosByTag = await Video.find({tags: {$in: tags}}).limit(20);
        res.status(200).json(videosByTag)
    } catch (error) {
        next(error)
    }
}

export const searchVideos = async (req, res, next) => {
    const query = req.query.q
    try {
        // search videos by any word which are in the title, accept lowercase and uppercase letters
        const videos = await Video.find({title: {$regex: query, $options: "i"}}).limit(40);
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}