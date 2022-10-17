import { createError } from "../error.js"
import User from "../models/User.js";
import Video from "../models/Video.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: {...req.body, password: hash},
            }, {new: true})
            res.status(200).json(updatedUser)
        }catch(error) {
            next(error)
        }
    } else {
        return next(createError(403, "You can only update your account!"))
    }
    
}

export const deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted")
        }catch(error) {
            next(error)
        }
    } else {
        return next(createError(403, "You can only delete your account!"))
    }   

}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            return next(createError(404, "User does not exist!"))
        }
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const subscribe = async (req, res, next) => {
    try {
        // find by jwt id
        await User.findByIdAndUpdate(req.user.id, {
            $push:{ subscribedUsers: req.params.id }     
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        })
        res.status(200).json("Successfully subscribed!")
    } catch (error) {
        next(error)
    }
}
export const unsubscribe = async (req, res, next) => {
    try {
        // find by jwt id
        await User.findByIdAndUpdate(req.user.id, {
            $pull:{ subscribedUsers: req.params.id }     
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        })
        res.status(200).json("Successfully unsubscribed!")
    } catch (error) {
        next(error)
    }

}

export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId, {
        $addToSet: { likes: id },// addToSet method push the id only once
        $pull: { dislikes: id }
      })
      res.status(200).json("The video is liked!")  
    } catch (error) {
        next(error)
    }
}

export const undoLike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId, {
       $pull: { likes: id }
      })
      res.status(200).json("The video is unliked!")  
    } catch (error) {
        next(error)
    }
}

export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId, {
        $addToSet: { dislikes: id },// addToSet method push the id only once
        $pull: { likes: id }
      })
      res.status(200).json("The video is disliked!")
    } catch (error) {
        next(error)
    }
}

export const undoDislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId, {
        $pull: { dislikes: id }
      })
      res.status(200).json("Dislike is undone!")
    } catch (error) {
        next(error)
    }
}