import { logHistory,getUserHistory } from "../controller/userHistory_controller";
import { Router } from "express";
import { verifyJWT } from "../middleware.js/auth_middleware";


const route=Router();
route.get("/history",getUserHistory);
export default route;