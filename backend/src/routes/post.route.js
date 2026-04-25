import {getproposalbyid,getAllPost,createproposal} from "../controller/post_controller.js"
import { Router } from "express"
import { verifyJWT } from "../middleware.js/auth_middleware.js"

const router = Router();
router.post("/post",verifyJWT,createproposal)
router.get("/allpost",verifyJWT,getAllPost)
router.get("/get/:id",verifyJWT,getproposalbyid);

export default router;