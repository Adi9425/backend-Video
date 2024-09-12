import { Router } from 'express';
import {
    getLikes,
    addLike,
    // updateLike,
    deleteLike
} from "../controller/like.controllers.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/:videoId").get(getLikes).post(addLike);
router.route("/c/:videoId").delete(deleteLike);

export default router