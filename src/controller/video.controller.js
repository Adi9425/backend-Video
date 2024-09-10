import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import  jwt  from "jsonwebtoken";
// import  subscriptions  from "../models/subscription.model.js";
// import { mongo } from "mongoose";
import mongoose from "mongoose";
import { Videos } from "../models/video.model.js";



const addVideo = asyncHandler(async (req,res)=>{
   try{ 
        
    
        const thumbnailLocalPath = req.files?.thumbnail[0]?.path

        if(!thumbnailLocalPath ){
            throw new ApiError(400,"Thumbnail file is missing")
        }
        const videoLocalPath = req.files?.videosFile[0]?.path

        if(!videoLocalPath ){
            throw new ApiError(400,"video file is missing")
        }
        
        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
        
        const videocloud = await uploadOnCloudinary(videoLocalPath)
            //cloudinary
        console.log(req.body);
        console.log(req.user);
        const video  = await Videos.create({
        videosFile:videocloud.url,
        thumbnail:thumbnail.url,
        title:req.body.title,
        description:req.body.description,
        duration:req.body.duration,
        views:req.body.views,
        isPublished:req.body.isPublished,
        owner:req.user._id,
        })

        return res.status(201).json(
            new ApiResponse(200,video,"Video added succsessfully")
        )
    }
    
    catch(err){
        console.log(err);
        throw new ApiError(500,"something went wrong in adding a video")
    }
  
})

const getVideos = asyncHandler(async(req,res)=>{
    const videos = await Videos.find()
    return res.status(200).json(
        {
            videos
        }
    )
})

export{addVideo,getVideos}