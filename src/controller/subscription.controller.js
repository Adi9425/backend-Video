import mongoose from "mongoose";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get all comments for a specific video
const getSubscriber = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    console.log(req.params);
    
    // Validate videoId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new ApiError(400, "Invalid video ID");
    }
  
    // Get the count of likes for the video
    const subscriberCount = await Subscription.countDocuments({ channel: userId });
  
    res.status(200).json(new ApiResponse(200, "Like count retrieved successfully", { subscriberCount }));
  });
  
// Add a comment to a video
const addSubscriber = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const subscriberId = req.user._id; // Assuming req.user contains authenticated user details
    console.log(req.params)
  // Check if the user has already liked the specific video
  const existSubscriber = await Subscription.findOne({
        channel: userId,
        subscriber: subscriberId
  });
  console.log(existSubscriber)
  if (existSubscriber) {
      throw new ApiError(409, "User has already subscribed to this channel");
  }

  // Validate video ID
//   if (!mongoose.Types.ObjectId.isValid(onwerId)) {
//       throw new ApiError(400, "Invalid video ID");
//   }

  // Create a new like
  const newSubscriber = await Subscription.create({
    channel: userId,
    subscriber: subscriberId
  });

  res.status(201).json(new ApiResponse(201, "Like added successfully", newSubscriber));
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


const unSubscribe = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const subscriberId = req.user._id; // Assuming req.user contains authenticated user details
      console.log(req.params)
    // Check if the user has already liked the specific video
    const existSubscriber = await Subscription.findOne({
          channel: userId,
          subscriber: subscriberId
    });
  console.log(existSubscriber)
  if (!existSubscriber) {
      throw new ApiError(404, "subscription not found or you are not authorized to unsubscribe it");
  }

  // Remove the like
  await Subscription.deleteOne({
        channel: userId,
        subscriber: subscriberId
});

  res.status(200).json(new ApiResponse(200, "unsubscribe successfully"));
});



export { getSubscriber, addSubscriber, unSubscribe };
