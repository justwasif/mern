import { UserHistory } from "../models/Userhistory.js";
import { ApiError } from "../utils/APiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const logHistory = async ({ user_id, action, comment_id, post_id }) => {
  try {
    await UserHistory.create({
      user_id,
      action,
      comment_id,
      post_id
    });
  } catch (err) {
    console.error("History log failed:", err.message);
  }
};


const getUserHistory = asyncHandler(async (req, res) => {
  try {
    const userId = req.user_id;

    const history = await UserHistory.find({
      user_id: userId
    })
      .populate("comment_id", "content is_deleted")
      .populate("post_id", "title")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, history));
  } catch (err) {
    return res.status(500).json(new ApiError(500, err.message));
  }
});

export { logHistory, getUserHistory };