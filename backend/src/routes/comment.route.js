import { Router } from "express";
import {createComment,deleteComment,getCommentByPost} from "../controller/comment_controller.js"
import { verifyJWT } from "../middleware.js/auth_middleware.js";

const router=Router();
router.post("/comment",verifyJWT,createComment);
router.get("/getc/:postId",verifyJWT,getCommentByPost);
router.delete("/delete/:id",verifyJWT,deleteComment)
export default router;