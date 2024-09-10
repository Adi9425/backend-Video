import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {addVideo} from"../controller/video.controller.js"
const router = Router();




//secure routes
router.route("/add").post(verifyJWT,
    upload.fields([
        {
            name:"thumbnail",
            maxCount:1
        },
        {
            name:"videosFile",
            maxCount:1
        }
    ]),addVideo)

// router.route("/login").post(registerUser)
 export default router;