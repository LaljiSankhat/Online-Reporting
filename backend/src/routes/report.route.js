import express from "express";
import { getMyFeedbacks, getMyReports, postAnIssue, setAsCompleted } from "../controllers/report.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { postFeedback, allIssues, getAllFeedbacks } from "../controllers/report.controller.js";

const router = express.Router();

router.post("/post-issue", protectRoute, postAnIssue);
router.post("/post-feedback", protectRoute, postFeedback);
router.get("/all-issues", protectRoute, allIssues);
router.put("/set-completed/:id", protectRoute, setAsCompleted);
router.get("/all-feedbacks", protectRoute, getAllFeedbacks);
router.get("/my-feedbacks/:id", protectRoute, getMyFeedbacks);
router.get("/my-reports/:id", protectRoute, getMyReports);


export default router;
