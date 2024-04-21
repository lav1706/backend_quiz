// models/Quiz.js
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  rightAnswer: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  attempts: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      answer: { type: Number, required: true },
      attemptTime: { type: Date, required: true },
    },
  ],
  resultsAvailable: { type: Boolean, default: false },
});

quizSchema.statics.updateQuizResults = async function () {
  const now = new Date();
  try {
    const quizzesToUpdate = await this.find({
      endDate: { $lte: now },
      resultsAvailable: false,
    });

    for (const quiz of quizzesToUpdate) {
      for (const attempt of quiz.attempts) {
        if (now >= attempt.attemptTime.getTime() + 5 * 60 * 1000) {
          // Calculate result logic
          const isCorrect = attempt.answer === quiz.rightAnswer;
          attempt.result = isCorrect ? "correct" : "incorrect";
        }
      }
      quiz.resultsAvailable = true;
      await quiz.save();
      console.log(`Results for quiz "${quiz.question}" are now available.`);
    }
  } catch (error) {
    console.error("Failed to update quiz results:", error);
  }
};

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
