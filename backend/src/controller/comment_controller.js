import { Comment } from "../models/Comment.js";
import { ApiError } from "../utils/APiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createComment = asyncHandler(async (req, res) => {
  try {
    const { post_id, content } = req.body;

    if (!post_id || !content) {
      return res.status(400).json(new ApiError(400, "enter required fields"));
    }

    const comment = await Comment.create({
      user_id: req.user_id,
      post_id,
      content
    });

    return res
      .status(201)
      .json(new ApiResponse(201, comment, "comment created"));
  } catch (err) {
    return res.status(500).json(new ApiError(500, err.message));
  }
});


const getCommentByPost = asyncHandler(async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({
      post_id: postId,
      is_deleted: false
    })
      .populate("user_id", "name")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, comments));
  } catch (err) {
    return res.status(500).json(new ApiError(500, err.message));
  }
});


const deleteComment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json(new ApiError(404, "no comment"));
    }

    if (comment.user_id.toString() !== req.user_id) {
      return res.status(403).json(new ApiError(403, "unauthorized"));
    }

    comment.is_deleted = true;
    await comment.save();

    return res
      .status(200)
      .json(new ApiResponse(200, null, "comment successfully removed"));
  } catch (err) {
    return res.status(500).json(new ApiError(500, err.message));
  }
});

export { createComment, deleteComment, getCommentByPost };