import {registerUser,loginUser,logoutUser} from "../controller/user_controller.js"
import {Router} from "express";
import { verifyJWT } from "../middleware.js/auth_middleware.js";
const router=Router();
router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser);
export default router;