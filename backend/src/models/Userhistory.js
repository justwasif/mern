import mongoose from "mongoose";

const hsitorySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  action: {
    type: String,
    enum: ["CREATE_COMMENT", "DELETE_COMMENT"],
    required: true
  },
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
 
}, { timestamps: true });




export const UserHistory = mongoose.model("UserHistory", hsitorySchema);