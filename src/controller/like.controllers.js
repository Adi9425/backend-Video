import mongoose from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get all comments for a specific video
const getLikes = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
  
    // Validate videoId
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      throw new ApiError(400, "Invalid video ID");
    }
  
    // Get the count of likes for the video
    const likeCount = await Like.countDocuments({ video: videoId });
  
    res.status(200).json(new ApiResponse(200, "Like count retrieved successfully", { likeCount }));
  });
  
// Add a comment to a video
const addLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id; // Assuming req.user contains authenticated user details

  // Check if the user has already liked the specific video
  const existedLike = await Like.findOne({
      video: videoId,
      likedBy: userId
  });
  console.log(existedLike)
  if (existedLike) {
      throw new ApiError(409, "User has already liked this video");
  }

  // Validate video ID
  if (!mongoose.Types.ObjectId.isValid(videoId)) {
      throw new ApiError(400, "Invalid video ID");
  }

  // Create a new like
  const newLike = await Like.create({
      video: videoId,
      likedBy: userId,
  });

  res.status(201).json(new ApiResponse(201, "Like added successfully", newLike));
});


// Update a comment
// const updateComment = asyncHandler(async (req, res) => {
//   const { commentId } = req.params;
//   const { content } = req.body;
//   const userId = req.user._id; // Assuming req.user contains authenticated user details

//   if (!mongoose.Types.ObjectId.isValid(commentId)) {
//     throw new ApiError(400, "Invalid comment ID");
//   }

//   const comment = await Comment.findOne({ _id: commentId, owner: userId });
//   if (!comment) {
//     throw new ApiError(404, "Comment not found or you are not authorized to update it");
//   }

//   comment.content = content;
//   await comment.save();

//   res.status(200).json(new ApiResponse(200, "Comment updated successfully", comment));
// });

// Delete a comment


const deleteLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id; // Assuming req.user contains authenticated user details
  console.log(req.params);
  console.log(userId);
  

  
  // Validate video ID
  // if (!mongoose.Types.ObjectId.isValid(videoId)) {
  //     throw new ApiError(400, "Invalid video ID");
  // }

  // Check if the user has liked the specific video
  const existedLike = await Like.findOne({
      video: videoId,
      likedBy: userId
  });
  console.log(existedLike)
  if (!existedLike) {
      throw new ApiError(404, "Like not found or you are not authorized to delete it");
  }

  // Remove the like
  await Like.deleteOne({
    video: videoId,
    likedBy: userId
});

  res.status(200).json(new ApiResponse(200, "Like deleted successfully"));
});



export { getLikes, addLike, deleteLike };
