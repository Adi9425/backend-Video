import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get all comments for a specific video
const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  // Validate the videoId
  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  const comments = await Comment.aggregate([
    { $match: { video: mongoose.Types.ObjectId(videoId) } },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
      },
    },
    { $unwind: "$ownerDetails" },
    {
      $project: {
        content: 1,
        "ownerDetails.username": 1,
        "ownerDetails.avatar": 1,
        createdAt: 1,
      },
    },
  ]).paginate(page, limit);

  res.status(200).json(new ApiResponse(200, "Comments fetched successfully", comments));
});
// Add a comment to a video
const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { content } = req.body;
  const userId = req.user._id; // Assuming req.user contains authenticated user details

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  const newComment = await Comment.create({
    content,
    video: videoId,
    owner: userId,
  });

  res.status(201).json(new ApiResponse(201, "Comment added successfully", newComment));
});

// Update a comment
const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user._id; // Assuming req.user contains authenticated user details

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  const comment = await Comment.findOne({ _id: commentId, owner: userId });
  if (!comment) {
    throw new ApiError(404, "Comment not found or you are not authorized to update it");
  }

  comment.content = content;
  await comment.save();

  res.status(200).json(new ApiResponse(200, "Comment updated successfully", comment));
});

// Delete a comment
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id; // Assuming req.user contains authenticated user details

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  const comment = await Comment.findOne({ _id: commentId, owner: userId });
  if (!comment) {
    throw new ApiError(404, "Comment not found or you are not authorized to delete it");
  }

  await comment.remove();

  res.status(200).json(new ApiResponse(200, "Comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
