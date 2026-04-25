import { logHistory,getUserHistory } from "../controller/userHistory_controller.js";
import { Router } from "express";
import { verifyJWT } from "../middleware.js/auth_middleware.js";


const route=Router();
route.get("/history",verifyJWT,getUserHistory);
export default route;