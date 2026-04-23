import {getproposalbyid,getAllPost,createproposal} from "../controller/post_controller.js"
import { Router } from "express"
import { verifyJWT } from "../middleware.js/auth_middleware.js"
import router from "./user.route.js"

router=Router();
router.post("/post",verifyJWT,createproposal)
router.get("/all post",verifyJWT,getAllPost)
router.get("/get",verifyJWT,getproposalbyid);

