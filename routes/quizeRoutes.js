import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  createQuiz,
  getActiveQuiz,
  getQuizResult,
} from "../controllers/quizController.js";

const router = express.Router();

router.post("/", authenticateUser, createQuiz);
router.get("/active", getActiveQuiz);
router.get("/:id/result", authenticateUser, getQuizResult);

export default router;
