import Quiz from "../models/Quiz.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create Quiz
export const createQuiz = asyncHandler(async (req, res) => {
  const { question, options, rightAnswer, startDate, endDate } = req.body;
  const createdBy = req.user.id;
  const quiz = new Quiz({
    question,
    options,
    rightAnswer,
    startDate,
    endDate,
    createdBy,
  });
  await quiz.save();
  res.status(201).json({ message: "Quiz created successfully" });
});

// Get Active Quiz
export const getActiveQuiz = asyncHandler(async (req, res) => {
  const now = new Date();
  const activeQuiz = await Quiz.findOne({
    isActive: true,
    startDate: { $lte: now },
    endDate: { $gte: now },
  });
  res.json(activeQuiz);
});

// Get Quiz Result
export const getQuizResult = asyncHandler(async (req, res) => {
  const quizId = req.params.id;
  const quiz = await Quiz.findById(quizId);
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

  const now = new Date();
  if (now < quiz.endDate.getTime() + 5 * 60 * 1000) {
    return res.status(403).json({ message: "Result is not available yet" });
  }

  const result = {
    correctAnswer: quiz.rightAnswer,
    additionalInfo: "Add your additional info here",
  };
  res.json(result);
});
