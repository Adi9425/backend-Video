import { Router } from 'express';
import {
    getSubscriber,
    addSubscriber,
    // updateLike,
    unSubscribe
} from "../controller/subscription.controller.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/:userId").get(getSubscriber).post(addSubscriber);
router.route("/c/:userId").delete(unSubscribe);

export default router